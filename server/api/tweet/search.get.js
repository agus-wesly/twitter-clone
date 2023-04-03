import { tweetTransform } from "../transform/twitter"
import { searchTweet } from "../db/tweet"

export default defineEventHandler(async (event) => {
  const searchQuery = getQuery(event).q

  const searchOption = {
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
  }
  const tweets = await searchTweet({
    where: {
      text: {
        contains: searchQuery.toLowerCase(),
        mode: "insensitive",
      },
    },
    ...searchOption,
  })

  return {
    data: tweets.map(tweetTransform),
  }
})
