import { prisma } from "."

export const createRefreshToken = async (token, userId) => {
  await prisma.refreshToken.create({
    data: {
      token,
      userId,
    },
  })
}

export const findTokenByToken = async (token) => {
  return await prisma.refreshToken.findFirst({
    where: {
      token,
    },
  })
}

export const deleteToken = async (token) => {
  try {
    console.log(token)

    await prisma.refreshToken.delete({
      where: {
        token,
      },
    })
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
