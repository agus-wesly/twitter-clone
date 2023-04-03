import { prisma } from "."

export const createTweet = async (newTweet) => {
  return prisma.tweet.create({
    data: newTweet,
  })
}

export const getTweet = (options = {}) => {
  return prisma.tweet.findMany({
    ...options,
  })
}

export const getTweetById = (options = {}, id) => {
  return prisma.tweet.findFirst({
    ...options,
    where: {
      id,
    },
  })
}

export const searchTweet = (options = {}) => {
  return prisma.tweet.findMany({
    ...options,
  })
}
