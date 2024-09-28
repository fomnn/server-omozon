import { prisma } from "~~/prisma/db"

export default eventHandler(async event => {
  const payment_methods = await prisma.payment_methods.findMany()

  return payment_methods
})