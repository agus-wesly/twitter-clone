import { likeOrDislikeTweet } from "../db/tweet"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
  const tweetId = event.context.params.id
  const userId = event.context.id

  if (!userId || !tweetId) {
    return sendError(
      event,
      createError({
        status: 400,
      })
    )
  }

  const { action } = await readBody(event)

  if (!action) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        message: "Action required !",
      })
    )
  }

  try {
    if (action === "LIKE") {
      const response = await likeOrDislikeTweet(tweetId, {
        likedBy: {
          connect: {
            id: userId,
          },
        },
      })

      return {
        data: response,
      }
    }

    if (action === "DISLIKE") {
      const response = await likeOrDislikeTweet(tweetId, {
        likedBy: {
          disconnect: {
            id: userId,
          },
        },
      })

      return {
        data: response,
      }
    }
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: "Server error",
      })
    )
  }
})
