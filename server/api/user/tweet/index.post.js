import formidable from "formidable"
import { sendError } from "h3"
import { createTweet } from "../../db/tweet"
import { createMedia } from "../../db/medaFile"
import { tweetTransform } from "../../transform/twitter"
import { uploadMedia } from "../../utils/cloudinary"

export default eventHandler(async (event) => {
  const form = formidable({})

  try {
    const body = await new Promise((res, rej) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          rej(err)
        }
        res({
          fields,
          files,
        })
      })
    })

    const authorId = event.context.id

    if (!authorId) {
      return sendError(
        createError({
          statusCode: 401,
          message: "Unauthorzed user",
        })
      )
    }

    const { fields, files } = body
    const newTweet = {
      authorId,
      text: fields.text,
    }

    if (fields.replyTo !== "null") {
      newTweet.replyToId = fields.replyTo
    }

    const sendTweet = await createTweet(newTweet)

    const allPromise = Object.keys(files).map(async (key) => {
      const media = await uploadMedia(files[key].filepath)

      await createMedia({
        url: media.secure_url,
        providerId: media.public_id,
        userId: authorId,
        tweetId: sendTweet.id,
      })
    })

    await Promise.all(allPromise)

    return {
      data: tweetTransform(sendTweet),
    }
  } catch (error) {
    console.log(error)

    return sendError(
      event,
      createError({
        statusCode: 500,
        message: "Server Error",
      })
    )
  }
})
