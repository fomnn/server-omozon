import { prisma } from "~~/prisma/db"

type SuppliersPostBody = {
  name: string
}

export default eventHandler(async (event) => {

  const {
    name
  } = await readBody<SuppliersPostBody>(event)

  const supplier = await prisma.suppliers.create({
    data: {
      name,
    }
  })

  return {
    id: supplier.id
  }
})