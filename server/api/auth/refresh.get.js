import { sendError } from "h3"
import { findUserByUsername } from "../db/user"
import { createToken, verifyRefreshToken } from "../utils/token"
import { findTokenByToken } from "../db/refreshtoken"

export default eventHandler(async (event) => {
  //Get the refresh token from cookkie
  const { refresh_token } = parseCookies(event)

  if (!refresh_token) {
    return sendError(
      event,
      createError({ statusCode: 401, message: "Token not found!" })
    )
  }

  //Find token in db
  const tokenData = await findTokenByToken(refresh_token)
  if (!tokenData) {
    return sendError(
      event,
      createError({ statusCode: 401, message: "Token invalid" })
    )
  }

  //Decode and verify token
  const decodedToken = verifyRefreshToken(refresh_token)
  if (!decodedToken) {
    return sendError(
      event,
      createError({ statusCode: 401, message: "Token invalidd" })
    )
  }

  //Create new access token
  const { accessToken } = createToken(decodedToken.userId)

  return {
    accessToken,
  }
})
