import { prisma } from "."

export const createMedia = async (data) => {
  await prisma.mediaFile.create({
    data,
  })
}
