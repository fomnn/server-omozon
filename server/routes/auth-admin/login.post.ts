import { prisma } from "~~/prisma/db"
import { createJWT, validateJWT, parseJWT } from "oslo/jwt"
import { TimeSpan } from "oslo";
import { sha256 } from "oslo/crypto";


interface LoginPostBody {
  username: string
  password: string
}

export default eventHandler(async (event) => {
  const {
    username,
    password
  } = await readBody<LoginPostBody>(event)

  const admin = await prisma.admin.findFirst({
    where: {
      username
    }
  })

  if (!admin) {
    return {
      success: false
    }
  }

  if (admin.password !== password) {
    return {
      success: false
    }
  }

  const payload = {
    id: admin.id,
  }

  const jwtToken = new TextEncoder().encode(useRuntimeConfig(event).jwtToken)
  const jwtTokenHashed = await sha256(jwtToken)
  const token = await createJWT("HS256", jwtTokenHashed, payload, {
    expiresIn: new TimeSpan(30, 'd'),
  })

  return {
    token,
    id: admin.id
  }
})