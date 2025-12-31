import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

import ws from 'ws';
neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;

// import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";
// import { neon } from "@neondatabase/serverless";
// import "dotenv/config";

// const sql = neon(process.env.DATABASE_URL);
// console.log("hello:",process.env.DATABASE_URL)
// const adapter = new PrismaNeon(sql);

// const globalForPrisma = global;

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     log: ["error"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }




// import { PrismaClient } from "@prisma/client"
// import { PrismaNeon } from "@prisma/adapter-neon"
// import { Neon } from "@neondatabase/serverless"
// // import { withAccelerate } from "@prisma/extension-accelerate"
// import "dotenv/config"

// const adapter = new PrismaNeon({
//   client: new Neon({ connectionString: process.env.DATABASE_URL })
// })

// const globalForPrisma = globalThis

// // Prisma client with both Neon adapter and Accelerate
// // const prisma =
// //   globalForPrisma.prisma || new PrismaClient({ adapter }).$extends(withAccelerate({
// //     url: process.env.ACCELERATE_URL // optional
// //   }))

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     log: ["error"],
//   });


// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma
// }

// export { prisma }



