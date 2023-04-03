import { findUserById } from "../db/user"

export default eventHandler(async (event) => {
  const userId = event.context.id
  const user = await findUserById(userId)

  return {
    user,
  }
})
