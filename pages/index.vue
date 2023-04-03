<template>
  <MainView title="Home" :user="user">
    <TweetForm
      :user="user"
      placeholder="What's going on ?"
      @success="handleTweetSuccess"
    />
    <div v-if="loading">
      <LogoLoading />
    </div>
    <div v-else>
      <TweetFeed :tweets="tweets" />
    </div>
  </MainView>
</template>

<script setup>
const { useAuthUser } = useAuth()
const user = useAuthUser()

const { getAllTweets } = useTweet()

const tweets = ref([])
const error = ref("")
const loading = ref(true)

function handleTweetSuccess(tweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

onBeforeMount(async () => {
  loading.value = true
  try {
    const data = await getAllTweets()
    tweets.value = data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>
