import { sendError } from "h3"
import { findUserByUsername } from "../db/user"
import { createToken } from "../utils/token"
import { createRefreshToken } from "../db/refreshtoken"
import bcrypt from "bcrypt"

export default eventHandler(async (event) => {
  const body = await readBody(event)

  const { username, password } = body

  const user = await findUserByUsername(username)

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "User not found",
      })
    )
  }

  const validUser = await bcrypt.compare(password, user.password)
  if (!validUser) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Wrong username or password",
      })
    )
  }

  const { accessToken, refreshToken } = createToken(user.id)

  await createRefreshToken(refreshToken, user.id)

  setCookie(event, "refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  })

  return {
    accessToken,
    user,
  }
})
