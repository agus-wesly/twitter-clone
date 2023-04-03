<template>
  <Head>
    <Title>Twitter | Search</Title>
  </Head>

  <MainView title="Tweet">
    <div v-if="loading">
      <LogoLoading />
    </div>

    <div
      v-else-if="error"
      class="p-5 text-lg text-center text-neutral-400 dark:text-neutral-200"
    >
      <FaceFrownIcon class="w-20 h-20 mx-auto" />
      <p class="text-sm text-neutral-800">
        {{ error }}
      </p>
    </div>

    <div v-else>
      <TweetFeed :tweets="tweets" />
    </div>
  </MainView>
</template>

<script setup>
import { FaceFrownIcon } from "@heroicons/vue/24/outline"
const { searchTweet } = useTweet()

const tweets = ref(null)
const error = ref("")
const loading = ref(true)

function getQuerySearch() {
  return useRoute().query.q
}

async function getTweet() {
  loading.value = true
  try {
    const response = await searchTweet(getQuerySearch())

    tweets.value = response
  } catch (err) {
    console.log(error)
    error.value = "Something goes wrong, Please try again later"
  } finally {
    loading.value = false
  }
}

watch(
  () => useRoute().fullPath,
  () => {
    getTweet()
  }
)

onBeforeMount(() => {
  getTweet()
})
</script>
