<template>
  <div v-if="postLoading" class="flex items-center justify-center">
    <LogoTwitter classes="w-10 animate-ping" />
  </div>
  <div
    v-else
    class="flex gap-3 pt-5 w-full p-3 dark:border-neutral-600"
    :class="{ 'border-b': !props.noborder }"
  >
    <img
      :src="props.user?.profileImage"
      class="w-9 h-9 rounded-full object-cover flex-none"
      alt="profile"
    />

    <div class="flex-1">
      <textarea
        v-model="tweetMessage"
        :placeholder="props.placeholder"
        class="w-full bg-transparent text-sm min-h-[56px] p-0 border-none rounded-lg mb-2 dark:text-neutral-200 focus:ring-transparent"
      />

      <input
        type="file"
        hidden
        ref="inputFileRef"
        @change="handleInputFileChange"
        accept=".gif, .jpeg, .jpg"
      />

      <div v-if="tweetMediaUrl" class="mb-8">
        <img
          :src="tweetMediaUrl"
          class="rounded-lg max-h-80 object-cover w-full"
        />
      </div>

      <div class="flex justify-between items-center">
        <!-- ICONS -->
        <div class="flex gap-3 flex-1 text-blue-500 dark:text-neutral-100">
          <PhotoIcon
            @click="inputFileRef.click()"
            class="w-7 h-7 hover:bg-sky-100 dark:hover:bg-neutral-900 rounded-full cursor-pointer p-1"
          />
          <GifIcon
            class="w-7 h-7 hover:bg-sky-100 dark:hover:bg-neutral-900 rounded-full cursor-pointer p-1"
          />
          <FaceSmileIcon
            class="w-7 h-7 hover:bg-sky-100 dark:hover:bg-neutral-900 rounded-full cursor-pointer p-1"
          />
        </div>

        <UIButton @click="handleButtonClick">Send</UIButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhotoIcon, GifIcon, FaceSmileIcon } from "@heroicons/vue/24/outline"

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  noborder: {
    type: Boolean,
    default: false,
  },
  replyTo: {
    type: String,
    default: null,
  },
})

const emits = defineEmits(["success"])

const postLoading = ref(false)
const postError = ref("")
const tweetMessage = ref("")
const inputFileRef = ref(null)
const tweetMedia = ref(null)
const tweetMediaUrl = ref("")

const { uploadTweet } = useTweet()

function resetField() {
  tweetMessage.value = ""
  tweetMedia.value = null
  tweetMediaUrl.value = ""
}

async function handleButtonClick() {
  postLoading.value = true
  try {
    const newTweet = await uploadTweet({
      text: tweetMessage.value,
      media: tweetMedia.value && [tweetMedia.value],
      replyTo: props.replyTo ?? null,
    })
    resetField()
    emits("success", newTweet)
  } catch (error) {
    postError.value = error
  } finally {
    postLoading.value = false
  }
}

function handleInputFileChange(event) {
  const file = event.target.files[0]
  tweetMedia.value = file

  //Display image to user
  const reader = new FileReader()
  reader.onload = (result) => {
    tweetMediaUrl.value = result.target.result
  }
  reader.readAsDataURL(file)
}
</script>
