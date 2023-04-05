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
      <SideRightProfile
        v-for="(acc, i) in accounts"
        :username="acc.username"
        :is-verified="acc.verified"
        :followers="acc.followers"
      />
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

const accounts = ref([
  {
    username: "Isaac",
    followers: "1.5k",
    verified: true,
  },
  {
    username: "Sam",
    followers: "10.1k",
    verified: false,
  },
  {
    username: "Leon",
    followers: "100k",
    verified: true,
  },
])
</script>
