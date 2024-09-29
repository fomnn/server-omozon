import { prisma } from "~~/prisma/db"
import { randomUUID } from 'uncrypto'
export default eventHandler(async (event) => {
  const formdata = await readFormData(event)

  const product_id = Number.parseInt(formdata.get('product_id') as string)
  const name = formdata.get('name') as string
  const sku = formdata.get('sku') as string
  const price = Number.parseInt(formdata.get('price') as string)
  const discounted_price = Number.parseInt(formdata.get('discounted_price') as string)
  const stock_quantity = Number.parseInt(formdata.get('stock_quantity') as string)
  const weight = formdata.get('weight') ? Number.parseInt(formdata.get('weight') as string) : null
  const material = formdata.get('material') as string
  const product_images = formdata.getAll('product_images') as File[]

  console.log(product_images)

  const productImageNames: string[] = []
  for (const product_image of product_images) {
    const uuidV4 = randomUUID()
    const imageExt = product_image.type.split('/')[1]
    const imageName = `${product_id}_${uuidV4}.${imageExt}`

    const formData = new FormData()
    formData.append('image', product_image)
    formData.append('key', imageName)

    const res = await $fetch('https://omozon-images-server.fathurrahmannotoy.workers.dev/images/upload', {
      method: 'POST',
      body: formData
    })

    console.log(res)

    productImageNames.push(imageName)
  }

  await prisma.variants.create({
    data: {
      name,
      price,
      sku,
      discounted_price,
      stock_quantity,
      weight,
      material,
      product_id: product_id,
      variant_images: {
        createMany: {
          data: productImageNames.map(p => ({
            file_name: p
          }))
        }
      }
    }
  })
})