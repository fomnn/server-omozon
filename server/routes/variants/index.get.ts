import { prisma } from "~~/prisma/db"

export default eventHandler(async (event) => {
  const query = getQuery(event)

  const showProductName = query['show-product-name']
  const product_id = query['product-id']


  const products = await prisma.variants.findMany({
    where: {
      ...(product_id && {
        product_id: parseInt(product_id as string)
      }),
    },
    include: {
      ...(showProductName && {
        products: {
          select: {
            name: true
          }
        }
      }),
      variant_images: {
        select: {
          file_name: true
        },
      }
    }
  })

  return products

})