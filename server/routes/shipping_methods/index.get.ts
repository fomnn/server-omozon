import { prisma } from "~~/prisma/db"

export default eventHandler(async event => {
  const shipping_methods = await prisma.shipping_methods.findMany()
  
  return shipping_methods
})