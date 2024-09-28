import { prisma } from "~~/prisma/db"

interface PaymentMethodsPostBody {
  provider: string
  transaction_fee: string
}

export default eventHandler(async event => {
  const {
    provider,
    transaction_fee
  } = await readBody<PaymentMethodsPostBody>(event)

  const payment_method = await prisma.payment_methods.create({
    data: {
      provider,
      transaction_fee: Number.parseFloat(transaction_fee)
    }
  })

  return {
    id: payment_method.id
  }
})