import { getAllUser } from "../db/user"
import { userTransform } from "../transform/user"

export default eventHandler(async (event) => {
  const limit = getQuery(event).limit
  let users

  if (limit) {
    users = await getAllUser({
      take: Number(limit),
    })
  } else {
    users = await getAllUser()
  }

  return {
    data: users.map(userTransform),
  }
})
