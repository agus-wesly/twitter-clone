import { sendError } from "h3"
import formidable from "formidable"
import { addUser } from "../db/user"
import { userTransform } from "../transform/user"
import { uploadMedia } from "../utils/cloudinary"
import bcrypt from "bcrypt"

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

    const { fields, files } = body

    const { name, username, email, password, confirmPassword } = fields

    if (
      username === "null" ||
      email === "null" ||
      password === "null" ||
      confirmPassword === "null"
    ) {
      return sendError(
        event,
        createError({ statusCode: 400, statusMessage: "Invalid field" })
      )
    }

    if (password !== confirmPassword) {
      return sendError(
        event,
        createError({
          statusCode: 400,
          statusMessage: "Unmatch password and confirm password !",
        })
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    let profileURL =
      "https://www.gotknowhow.com/media/avatars/images/default/large-user-avatar.png"

    //Upload to cloudinary if available
    if (files.profile) {
      const profileImageURL = files.profile.filepath
      profileURL = (await uploadMedia(profileImageURL)).secure_url
    }

    const newUser = {
      name,
      username,
      email,
      password: hashedPassword,
      profileImage: profileURL,
    }

    const response = await addUser(newUser)

    return {
      data: userTransform(response),
    }
  } catch (error) {
    return sendError(
      event,
      createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    )
  }
})
