export default () => {
  const useModalOpen = () => useState("use_modal", () => false)
  const useModalContent = () => useState("use_modal_content", () => null)

  const setModalContent = (content) => {
    const modalContent = useModalContent()
    modalContent.value = content
  }

  const closeModal = () => {
    const modal = useModalOpen()
    modal.value = false
  }

  const openModal = (content = null) => {
    const modal = useModalOpen()
    modal.value = true

    setModalContent(content)
  }

  const uploadTweet = async ({ text, media, replyTo }) => {
    const form = new FormData()
    form.append("text", text)
    form.append("replyTo", replyTo)

    if (media?.length) {
      media.forEach((m, i) => {
        form.append("media" + i, m)
      })
    }

    try {
      const { data } = await useFetchData("/api/user/tweet", {
        method: "POST",
        body: form,
      })

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const getAllTweets = () => {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await useFetchData("/api/tweet")
        res(data)
      } catch (error) {
        console.log(error)

        rej(error)
      }
    })
  }

  const getTweetById = (id) => {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await useFetchData(`/api/tweet/${id}`)

        res(data)
      } catch (error) {
        console.log(error)

        rej(error)
      }
    })
  }

  const searchTweet = (text) => {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await useFetchData(`/api/tweet/search?q=${text}`)

        res(data)
      } catch (error) {
        console.log(error)

        rej("Username or password incorrect")
      }
    })
  }

  const likeTweet = (tweetId, action) => {
    return new Promise(async (res, rej) => {
      try {
        const { data } = await useFetchData(`/api/tweet/${tweetId}`, {
          method: "PUT",
          body: {
            action,
          },
        })

        res(data)
      } catch (error) {
        rej(error)
      }
    })
  }

  return {
    uploadTweet,
    getAllTweets,
    getTweetById,
    searchTweet,
    useModalOpen,
    useModalContent,
    setModalContent,
    closeModal,
    openModal,
    likeTweet,
  }
}
