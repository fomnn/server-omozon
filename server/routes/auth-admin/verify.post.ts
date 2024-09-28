import { sha256 } from "oslo/crypto"
import { validateJWT } from "oslo/jwt"

export default eventHandler(async (event) => {
  const token = event.node.req.headers.authorization?.replace('Bearer ', '')

  const jwtToken = new TextEncoder().encode(useRuntimeConfig(event).jwtToken)
  const jwtTokenHashed = await sha256(jwtToken)

  try {
    const jwt = await validateJWT(
      "HS256",
      jwtTokenHashed,
      token,
    );
    return jwt.payload
  } catch (e) {
    setResponseStatus(event, 401)
    return null
    // invalid signature
    // expired token
    // inactive token (`nbf`)
  }

})