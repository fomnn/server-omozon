import { prisma } from "~~/prisma/db"

export default eventHandler(async event => {
  const suppliers = await prisma.suppliers.findMany()

  return suppliers
})