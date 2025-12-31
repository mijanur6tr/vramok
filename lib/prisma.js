import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Neon } from "@neondatabase/serverless"
import { withAccelerate } from "@prisma/extension-accelerate"
import "dotenv/config"

const adapter = new PrismaNeon({
  client: new Neon({ connectionString: process.env.DATABASE_URL })
})

const globalForPrisma = globalThis

// Prisma client with both Neon adapter and Accelerate
const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter }).$extends(withAccelerate({
    url: process.env.ACCELERATE_URL // optional
  }))

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export { prisma }
