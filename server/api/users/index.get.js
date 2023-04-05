import { getAllUser } from "../db/user"
import { userTransform } from "../transform/user"

export default eventHandler(async (event) => {
  const users = await getAllUser()

  return {
    data: users.map(userTransform),
  }
})
