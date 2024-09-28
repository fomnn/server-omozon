import { prisma } from "~~/prisma/db"

export default eventHandler(async (event) => {

  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
      category_parent_id: true,
    }
  })

  return categories
})