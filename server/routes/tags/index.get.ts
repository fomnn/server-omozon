import { prisma } from "~~/prisma/db"

export default eventHandler(async (event) => {
  const tags = await prisma.tags.findMany()

  return tags
})