import { getTweetById } from "../db/tweet"
import { tweetTransform } from "../transform/twitter"
import { sendError } from "h3"

export default defineEventHandler(async (event) => {
  const id = event.context.params.id

  try {
    const tweet = await getTweetById(
      {
        include: {
          author: true,
          replyTo: {
            include: {
              author: true,
            },
          },
          media: true,
          replies: {
            include: {
              author: true,
              replyTo: {
                include: {
                  author: true,
                },
              },
              media: true,
            },
          },
        },
      },
      id
    )
    return {
      data: tweetTransform(tweet),
    }
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        message: "Not found",
      })
    )
  }
})
