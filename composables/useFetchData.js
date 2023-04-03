export default async (url, option = {}) => {
  const { useAuthToken } = useAuth()
  const authToken = useAuthToken().value
  try {
    const response = await $fetch(url, {
      ...option,
      headers: {
        ...option.headers,
        Authorization: `Bearer ${authToken}`,
      },
    })

    return response
  } catch (error) {
    return null
  }
}
