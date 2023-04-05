import { sendError } from "h3"
import { verifyAccessToken } from "../api/utils/token"

export default defineEventHandler((event) => {
  const reqURL = event.node.req.url
  //Check the request
  if (reqURL.includes("user") || reqURL.includes("tweet")) {
    const reqHeaders = getRequestHeaders(event)
    const accessToken = (
      reqHeaders["Authorization"] || reqHeaders["authorization"]
    )?.split(" ")[1]

    if (!accessToken) {
      return sendError(
        event,
        createError({
          statusCode: 401,
          message: "Token not found",
        })
      )
    }
    //Decode access token
    const decodedAccessToken = verifyAccessToken(accessToken)
    if (!decodedAccessToken) {
      return sendError(
        event,
        createError({
          statusCode: 401,
          message: "Invalid token",
        })
      )
    }
    //return to next
    event.context.id = decodedAccessToken.userId
  }
})
