import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismadb: undefined | ReturnType<typeof prismaClientSingleton>
}

const prismadb = globalThis.prismadb ?? prismaClientSingleton()

export default prismadb

if (process.env.NODE_ENV !== 'production') globalThis.prismadb = prismadb