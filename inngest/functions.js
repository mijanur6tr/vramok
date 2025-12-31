import { inngest } from "./client";
import { prisma } from "@/lib/prisma";


export const saveUserCreation = inngest.createFunction(
    {id:"save-user-creation"},
    {event:"clerk/user.created"},
    async ({event})=>{
        //collecting the data from the event
        const { data } = event
        // const { id, first_name, last_name,image_url } = user;
        // const email = user.email_addresses.find(e =>
        // e.id === user.primary_email_address_id
        // ).email;
        //updating the database
        await prisma.user.create({
            data:{
                id:data.id,
                name:`${data.first_name} ${data.last_name}`,
                email:data.email_addresses[0].email_address,
                image:data.image_url
            }
        })
    }
)

//user update

export const saveUserUpdate = inngest.createFunction(
    {id:"save-user-update"},
    {event:"clerk/user.updated"},
    async ({event})=>{
        const {data} = event
        // const { id, first_name, last_name,image_url } = user;
        // const email = user.email_addresses.find(e =>
        // e.id === user.primary_email_address_id
        // ).email;

        await prisma.user.update({
            where:{
                id:data.id
            },
            data:{
                name:`${data.first_name} ${data.last_name}`,
                email:data.email_addresses[0].email_address,
                image:data.image_url
            }
        })
    }
)

//user delelte

export const deleteUser = inngest.createFunction(
    {id:"delete-user"},
    {event:"clerk/user.deleted"},
    async ({event})=>{
        const {data} = event
        // const { id } = user;
        await prisma.user.delete({
            where:{
                id:data.id
            }
        })
    }
)