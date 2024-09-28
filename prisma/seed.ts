import { prisma } from "./db"

async function main() {
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password: 'admin',
    }
  })

  console.log({ admin })
}

main()