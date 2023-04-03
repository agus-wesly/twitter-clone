<template>
  <div
    class="pb-3 px-3 text-sm dark:border-neutral-700"
    @click="handleTweetClick"
    :class="[
      !compact
        ? 'border-b hover:bg-neutral-100 dark:hover:bg-neutral-900/30 cursor-pointer'
        : '',
    ]"
  >
    <TweetItemHead :tweet="tweet" :compact="props.compact" />

    <div class="space-y-2" :class="{ 'ml-12': !props.compact }">
      <p
        class="text-black dark:text-neutral-100 wrap-text"
        :class="[props.compact ? 'text-xl lg:text-2xl' : 'text-sm']"
      >
        {{ tweet.text }}
      </p>

      <div v-for="media in tweetMedia" :key="media.id">
        <img
          :src="media.url"
          alt="tweet-media"
          class="w-full rounded-2xl max-h-96 object-cover"
        />
      </div>

      <div v-if="!props.hideItemIcon" class="flex justify-evenly">
        <TweetItemIcon
          @click.stop.prevent="handleCommentClick"
          :compact="props.compact"
          color="blue"
        >
          <template #icon="{ classes }">
            <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
          </template>
          <p>
            {{ tweet.replies.length }}
          </p>
        </TweetItemIcon>

        <TweetItemIcon :compact="props.compact" color="yellow">
          <template #icon="{ classes }">
            <ArrowPathIcon :class="classes" />
          </template>
          1
        </TweetItemIcon>

        <TweetItemIcon :compact="props.compact" color="red">
          <template #icon="{ classes }">
            <HeartIcon :class="classes" />
          </template>
          1
        </TweetItemIcon>

        <TweetItemIcon :compact="props.compact" color="blue">
          <template #icon="{ classes }">
            <ArrowUpTrayIcon :class="classes" />
          </template>
          1
        </TweetItemIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  HeartIcon,
} from "@heroicons/vue/24/outline"

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  hideItemIcon: {
    type: Boolean,
    default: false,
  },
})
const tweet = props.tweet
const tweetMedia = props.tweet?.media

const { openModal } = useTweet()

function handleTweetClick() {
  if (props.compact) return
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

function handleCommentClick() {
  openModal(tweet)
}
</script>
