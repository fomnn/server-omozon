import { prisma } from "~~/prisma/db"

type ShippingMethodsPostBody = {
  option: string
}

export default eventHandler(async (event) => {

  const {
    option
  } = await readBody<ShippingMethodsPostBody>(event)

  const shipping_method = await prisma.shipping_methods.create({
    data: {
      option,
    }
  })

  return {
    id: shipping_method.id,
  }
})