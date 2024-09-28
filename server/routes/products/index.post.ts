import { prisma } from "~~/prisma/db"

export default eventHandler(async (event) => {
  const formData = await readFormData(event)

  const name = formData.get('name') as string
  const long_desc = formData.get('long_desc') as string
  const short_desc = formData.get('short_desc') as string
  const shipping_method_ids = formData.getAll('shipping_method_ids') as string[]
  const supplier_id = formData.get('supplier_id') as string
  const category_id = Number.parseInt(formData.get('category_id') as string)
  const category_id_2 = formData.get('category_id_2') != null ? Number.parseInt(formData.get('category_id_2') as string) : null
  const category_id_3 = formData.get('category_id_3') != null ? Number.parseInt(formData.get('category_id_2') as string) : null

  
  const product_tags = formData.getAll('product_tags') as string[]
  // TODO: connect to tags

  // console.log({
  //   name,
  //   long_desc,
  //   short_desc,
  //   shipping_method_ids,
  //   supplier_id,
  //   category_id,
  //   category_id_2,
  //   category_id_3,
  //   product_tags
  // })

  const product = await prisma.products.create({
    data: {
      name,
      long_desc,
      product_shipping_methods: {
        createMany: {
          data: shipping_method_ids.map(id => ({
            shipping_method_id: parseInt(id)
          }))
        }
      },
      supplier: {
        connect: {
          id: parseInt(supplier_id)
        }
      },
      categories_products_category_idTocategories: {
        connect: {
          id: category_id
        }
      },
      // ini gatau bakal error apa engga
      // Hanya tambahkan properti jika nilai tidak null
    ...(category_id_2 && {
      categories_products_category_id_2Tocategories: {
        connect: {
          id: category_id_2
        }
      }
    }),
    ...(category_id_3 && {
      categories_products_category_id_3Tocategories: {
        connect: {
          id: category_id_3
        }
      }
    }),
      short_desc,
    }
  })

  for (const product_tag of product_tags) {
    const { id } = await $fetch('/tags', {
      method: 'POST',
      body: {
        tag: product_tag
      }
    })

    await prisma.product_tags.create({
      data: {
        product_id: product.id,
        tag_id: id
      }
    })
  }

  return { id: product.id }
})