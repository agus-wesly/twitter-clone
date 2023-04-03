<template>
  <div class="flex py-3">
    <img :src="author.profileImage" class="w-9 h-9 object-cover rounded-full" />

    <div class="ml-3 text-neutral-500 dark:text-neutral-400">
      <span class="font-bold text-neutral-800 dark:text-gray-300 text-base">{{
        author.name.slice(0, 8)
      }}</span>
      <span class="text-xs mx-3">@{{ author.username.slice(0, 8) }}</span>
      <span class="font-semibold text-xs">{{ tweet.created }}</span>

      <div v-if="tweet.replyTo">
        <p class="text-xs">
          Reply to
          <NuxtLink
            @click.stop
            :to="`/status/${tweet.replyTo.id}`"
            class="text-blue-500 hover:underline cursor-pointer"
            >{{ tweet.replyTo.author.username }}</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
const tweet = props.tweet
const author = tweet.author
</script>
