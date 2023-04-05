<template>
  <div class="space-y-3 fixed top-0 p-4 lg:p-6">
    <SideRightSearch />
    <SideRightItem title="What's happening">
      <div
        class="p-2 cursor-pointer hover:bg-sky-50 dark:hover:bg-black group"
        v-for="(topic, i) in topics"
        :key="i"
      >
        <h5
          class="font-bold text-neutral-800 dark:text-neutral-300 text-sm group-hover:text-sky-800 dark:group-hover:text-sky-500"
        >
          {{ topic.title }}
        </h5>
        <p class="text-xs text-neutral-500">{{ topic.tweet }} Tweets</p>
      </div>
    </SideRightItem>

    <SideRightItem title="Who to follow">
      <LogoLoading v-if="loading" />

      <div v-if="error">
        <p>Something went wrong</p>
      </div>

      <div v-else>
        <SideRightProfile
          v-for="acc in accounts"
          :key="acc.id"
          :username="acc.username"
          :is-verified="acc.verified"
          :profile-image="acc.profileImage"
        />
      </div>
    </SideRightItem>

    <div class="flex flex-wrap gap-x-4">
      <p
        @click="darkMode = !darkMode"
        class="text-neutral-500 text-xs cursor-pointer select-none"
      >
        {{ darkMode ? "Light mode" : "Dark mode" }}
      </p>
      <p class="text-neutral-500 text-xs">Privacy Policy</p>
      <p class="text-neutral-500 text-xs">Cookie Policy</p>
      <p class="text-neutral-500 text-xs">Accessibility</p>
      <p class="text-neutral-500 text-xs">Ads info</p>
      <p class="text-neutral-500 text-xs">More</p>
      <p class="text-neutral-500 text-xs">2022 Twitter, Inc.</p>
    </div>
  </div>
</template>

<script setup>
const { getAllUsers } = useUser()
const topics = ref([
  {
    title: "Twice",
    tweet: "16.5k",
  },
  {
    title: "#CodingIsFun",
    tweet: "9.36k",
  },
  {
    title: "ChatGPT-4",
    tweet: "5.31k",
  },
])

const darkMode = inject("darkMode")

const loading = ref(true)
const error = ref("")
const accounts = ref([])

onMounted(async () => {
  loading.value = true
  try {
    const data = await getAllUsers()
    accounts.value = data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>
