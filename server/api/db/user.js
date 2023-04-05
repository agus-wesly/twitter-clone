import { prisma } from "."

export const addUser = async (user) => {
  return await prisma.user.create({
    data: user,
  })
}

export const getAllUser = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "asc",
    },
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

export const findUserThatIncludeUsername = async (username) => {
  return await prisma.user.findFirst({
    where: {
      username: {
        contains: username,
      },
    },
  })
}
