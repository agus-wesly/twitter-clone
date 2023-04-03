import { getTweet } from "../db/tweet"
import { tweetTransform } from "../transform/twitter"

export default defineEventHandler(async (event) => {
  const tweets = await getTweet({
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
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return {
    data: tweets.map(tweetTransform),
  }
})
