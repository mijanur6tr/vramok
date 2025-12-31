import { inngest } from "./client";
import { prisma } from "@/lib/prisma";


export const saveUserCreation = inngest.createFunction(
    {id:"save-user-creation"},
    {event:"clerk/user.created"},
    async ({event})=>{
        //collecting the data from the event
        const { user } = event.data;
        const { id, first_name, last_name,image_url } = user;
        const email = user.email_addresses.find(e =>
        e.id === user.primary_email_address_id
        ).email;
        //updating the database
        await prisma.user.create({
            data:{
                id:id,
                name:`${first_name} ${last_name}`,
                email:email,
                image:image_url
            }
        })
    }
)

//user update

export const saveUserUpdate = inngest.createFunction(
    {id:"save-user-update"},
    {event:"clerk/user.updated"},
    async ({event})=>{
        const {user} = event.data
        const { id, first_name, last_name,image_url } = user;
        const email = user.email_addresses.find(e =>
        e.id === user.primary_email_address_id
        ).email;

        await prisma.user.update({
            where:{
                id:id
            },
            data:{
                email:email,
                image:image_url,
                name:`${first_name} ${last_name}`
            }
        })
    }
)

//user delelte

export const deleteUser = inngest.createFunction(
    {id:"delete-user"},
    {event:"clerk/user.deleted"},
    async ({event})=>{
        const {user} = event.data
        const { id } = user;
        await prisma.user.delete({
            where:{id:id}
        })
    }
)