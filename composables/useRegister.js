export default () => {
  const register = async (userData, media) => {
    const form = new FormData()
    const { name, username, email, password, confirmPassword } = userData
    form.append("name", name)
    form.append("username", username)
    form.append("email", email)
    form.append("password", password)
    form.append("confirmPassword", confirmPassword)

    if (media) {
      form.append("profile", media)
    }

    try {
      const { data } = await useFetchData("/api/auth/register", {
        method: "POST",
        body: form,
      })

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    register,
  }
}
