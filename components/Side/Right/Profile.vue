<template>
  <div class="p-2">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2 group">
        <img
          src="/profile.jpeg"
          class="w-10 h-10 rounded-full object-cover cursor-pointer"
        />

        <div>
          <h5
            class="text-sm font-bold cursor-pointer group-hover:text-sky-800 dark:group-hover:text-sky-500 flex gap-1 dark:text-neutral-300"
          >
            {{ props.username }}
            <span v-if="props.isVerified" class="inline">
              <VerifiedIcon class="w-3 h-3 mt-1 text-sky-600" />
            </span>
          </h5>
          <p class="text-neutral-500 text-sm">
            {{ props.followers }} followers
          </p>
        </div>
      </div>

      <button
        class="py-2 px-3 bg-neutral-900 dark:bg-gray-800 rounded-full text-xs text-neutral-100 font-bold"
      >
        Follow
      </button>
    </div>
  </div>
</template>

<script setup>
import VerifiedIcon from "@heroicons/vue/24/solid/CheckBadgeIcon"

const props = defineProps({
  username: {
    type: String,
    required: true,
  },

  followers: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: false,
  },
})
</script>
