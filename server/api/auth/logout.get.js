import { deleteToken } from "../db/refreshtoken"
import { sendError } from "h3"

export default eventHandler(async (event) => {
  const { refresh_token } = parseCookies(event)
  if (!refresh_token) {
    setResponseStatus(event, 204)
    return {}
  }

  try {
    await deleteToken(refresh_token)

    setCookie(event, "refresh_token", "", {
      httpOnly: true,
    })

    setResponseStatus(event, 204)

    return {
      message: "done",
    }
  } catch (error) {
    console.log(error)

    return sendError(
      event,
      createError({
        statusCode: "500",
        message: "Server error",
      })
    )
  }
})
