import { prisma } from "~~/prisma/db"

export default eventHandler(async (event) => {
  const products = await prisma.products.findMany()

  return products
})