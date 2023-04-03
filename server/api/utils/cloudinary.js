import { v2 } from "cloudinary"

const cloudinary = () => {
  v2.config({
    cloud_name: useRuntimeConfig().cloudName,
    api_key: useRuntimeConfig().apiKey,
    api_secret: useRuntimeConfig().apiSecret,
  })
  return v2
}

export const uploadMedia = (uploadURL) => {
  return cloudinary().uploader.upload(uploadURL)
}
