import { prisma } from "."

export const addUser = async (user) => {
  return await prisma.user.create({
    data: user,
  })
}

export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  })
}

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}
