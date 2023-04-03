<template>
  <div>
    <div v-if="props.tweets.length">
      <TweetItem v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
    </div>
    <div v-else>
      <p
        class="text-center text-sm py-3 font-semibold text-neutral-800 dark:text-neutral-200"
      >
        No tweet 😢
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tweets: {
    type: Array,
    required: true,
  },
})
</script>
