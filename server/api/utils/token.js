import jwt from "jsonwebtoken"

const createAccessToken = (id) => {
  return jwt.sign({ userId: id }, useRuntimeConfig().accessTokenSecret, {
    expiresIn: "5m",
  })
}

const createRefreshToken = (id) => {
  return jwt.sign({ userId: id }, useRuntimeConfig().refreshTokenSecret, {
    expiresIn: "4h",
  })
}

export const createToken = (id) => {
  const accessToken = createAccessToken(id)
  const refreshToken = createRefreshToken(id)

  return {
    accessToken,
    refreshToken,
  }
}

export const createCookie = (event, token) => {
  setCookie(event, "refresh-token", token, {
    httpOnly: true,
    sameSite: true,
  })
}

export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, useRuntimeConfig().refreshTokenSecret)
    return decoded
  } catch (error) {
    return null
  }
}

export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, useRuntimeConfig().accessTokenSecret)
    return decoded
  } catch (error) {
    return null
  }
}
