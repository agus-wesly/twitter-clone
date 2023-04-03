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
