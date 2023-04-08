export default () => {
  const getAllUsers = async (limit = 0) => {
    try {
      const { data } = await useFetchData(`/api/users?limit=${limit}`)

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    getAllUsers,
  }
}
