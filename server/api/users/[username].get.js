import { findUserThatIncludeUsername } from "../db/user"

export default eventHandler(async (event) => {
  const username = event.context.params.username
  const user = await findUserThatIncludeUsername(username)

  if (!user) {
    return {
      data: [],
    }
  }

  return {
    data: user,
  }
})
