import { prisma } from "~~/prisma/db"

type CategoriesPostBody = {
  name: string | null
  description: string | null
  category_parent_id: number | null
}

export default eventHandler(async (event) => {

  const {
    name,
    description,
    category_parent_id
  } = await readBody<CategoriesPostBody>(event)

  const category = await prisma.categories.create({
    data: {
      name,
      description,
      category_parent_id,
      slug: useCategoryNameToSlug(name),
    }
  })

  console.log(category)

  return {
    id: category.id
  }
})