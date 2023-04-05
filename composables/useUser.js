export default () => {
  const getAllUsers = async () => {
    try {
      const { data } = await useFetchData("/api/users")

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    getAllUsers,
  }
}
