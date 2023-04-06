import jwt_decode from "jwt-decode"

export default () => {
  const useAuthUser = () => useState("auth_user")
  const useAuthToken = () => useState("auth_token")
  const useAuthLoading = () => useState("auth_loading", () => true)

  const setUser = (newUser) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }

  const setToken = (newToken) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }

  const setLoading = (newVal) => {
    const authLoading = useAuthLoading()
    authLoading.value = newVal
  }

  const loginUser = (username, password) => {
    return new Promise(async (res, rej) => {
      try {
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        })
        setToken(response.accessToken)
        setUser(response.user)
        res(true)
      } catch (error) {
        rej(error)
      }
    })
  }

  const refresh = () => {
    return new Promise(async (res, rej) => {
      try {
        const resp = await $fetch("/api/auth/refresh")
        setToken(resp.accessToken)
        res(true)
      } catch (error) {
        return rej(null)
      }
    })
  }

  const getUser = () => {
    return new Promise(async (res, rej) => {
      try {
        const { user } = await useFetchData("/api/user")
        setUser(user)
        res(true)
      } catch (error) {
        return rej(null)
      }
    })
  }

  const reRefreshToken = () => {
    const token = useAuthToken().value
    const { exp } = jwt_decode(token)
    const refetchTime = exp - 60000

    setTimeout(async () => {
      await refresh()
      reRefreshToken()
    }, refetchTime)
  }

  const initAuth = () => {
    return new Promise(async (res, rej) => {
      if (useAuthUser().value?.id) {
        return res(true)
      }
      try {
        setLoading(true)
        await refresh()
        await getUser()
        reRefreshToken()
        res(true)
      } catch (error) {
        rej(error)
      } finally {
        setLoading(false)
      }
    })
  }

  const logoutUser = async () => {
    try {
      const response = await $fetch("/api/auth/logout", {
        method: "GET",
      })
      setToken(null)
      setUser(null)
    } catch (error) {
      throw new Error(error.statusMessage)
    }
  }

  return {
    loginUser,
    initAuth,
    useAuthToken,
    useAuthUser,
    useAuthLoading,
    logoutUser,
  }
}
