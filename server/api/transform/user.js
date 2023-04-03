export const userTransform = (user) => {
  const { password, createdAt, updatedAt, ...rest } = user
  return {
    ...rest,
  }
}
