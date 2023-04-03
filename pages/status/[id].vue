<template>
  <Head>
    <Title>Twitter | Status</Title>
  </Head>

  <MainView title="Tweet">
    <div v-if="loading">
      <LogoLoading />
    </div>

    <div v-else>
      <TweetItem :tweet="tweet" compact />

      <TweetForm
        placeholder="Tweet your reply..."
        :user="user"
        :replyTo="tweet.id"
        @success="handleSuccessAddTweet"
      />

      <TweetFeed :tweets="tweet.replies || []" />
    </div>
  </MainView>
</template>

<script setup>
const { getTweetById } = useTweet()
const { useAuthUser } = useAuth()
const user = useAuthUser()

const tweet = ref(null)
const error = ref("")
const loading = ref(true)

function getTweetIdByRoute() {
  return useRoute().params.id
}

async function getTweet() {
  loading.value = true
  try {
    const response = await getTweetById(getTweetIdByRoute())

    tweet.value = response
  } catch (err) {
    console.log(error)
    error.value = err
  } finally {
    loading.value = false
  }
}

function handleSuccessAddTweet(tweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

onBeforeMount(() => {
  getTweet()
})
</script>
