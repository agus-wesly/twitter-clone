import { deleteToken } from "../db/refreshtoken"
import { sendError } from "h3"

export default eventHandler(async (event) => {
  const refreshToken = getCookie(event, "refresh_token")
  if (!refreshToken) {
    setResponseStatus(event, 204)
    return {}
  }

  try {
    await deleteToken(refreshToken)
    deleteCookie(event, "refresh_token", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })

    setResponseStatus(event, 204)

    return {}
  } catch (error) {
    console.log(error)

    return sendError(
      event,
      createError({
        statusCode: "500",
        statusMessage: "Server error",
      })
    )
  }
})
