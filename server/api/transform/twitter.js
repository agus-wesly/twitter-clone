import { userTransform } from "./user"
import { transformMedia } from "./media"
import human from "human-time"

export const tweetTransform = (twitter) => ({
  id: twitter.id,
  text: twitter.text,
  author: !!twitter.author ? userTransform(twitter.author) : null,
  replyTo: !!twitter.replyTo ? tweetTransform(twitter.replyTo) : null,
  replies: !!twitter.replies ? twitter.replies.map(tweetTransform) : [],
  replyCount: !!twitter.replies ? twitter.replies.length : 0,
  media: !!twitter.media ? twitter.media.map(transformMedia) : [],
  created: human(twitter.createdAt),
})
