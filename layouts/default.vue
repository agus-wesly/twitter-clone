<template>
  <Html :class="`${darkMode ? 'dark' : ''}`">
    <Head>
      <Title>Home | Twitter</Title>
    </Head>
    <Body class="bg-neutral-50 dark:bg-neutral-800">
      <!-- APP -->
      <div v-if="authLoading" class="min-h-screen flex items-center">
        <LogoLoading />
      </div>
      <div
        v-else
        class="grid grid-cols-12 m-auto max-w-7xl dark:bg-neutral-800"
      >
        <!-- LEFT-SIDEBAR -->
        <div class="col-span-2 md:col-span-3 lg:col-span-2 sm:block">
          <SideLeft />
        </div>

        <!-- MAIN -->
        <main
          class="col-span-10 md:col-span-9 lg:col-span-6 lg:-mt-8 lg:pt-4 pb-14 sm:pb-0"
        >
          <slot />
        </main>

        <!-- RIGHT SIDEBAR -->
        <div class="hidden lg:block lg:col-span-4">
          <SideRight />
        </div>

        <UIModal>
          <div v-if="modalContent">
            <TweetItem :tweet="modalContent" hideItemIcon compact />
            <TweetForm
              :user="user"
              :replyTo="modalContent.id"
              :placeholder="`Reply to ${modalContent.author.name}...`"
              @success="handleTweetSuccess"
              noborder
            />
          </div>
          <div v-else>
            <TweetForm
              :user="user"
              placeholder="What's going on ?"
              noborder
              @success="handleTweetSuccess"
            />
          </div>
        </UIModal>
      </div>

      <!-- <Bottom /> -->
    </Body>
  </Html>
</template>

<script setup>
const darkMode = useState("dark-mode", () => false)
provide("darkMode", darkMode)

//AUTH
const { initAuth, useAuthUser, useAuthLoading } = useAuth()
const user = useAuthUser()
const authLoading = useAuthLoading()

const { useModalContent, closeModal } = useTweet()
const modalContent = useModalContent()

watchEffect(() => {
  if (!user.value && !authLoading.value) {
    navigateTo({
      path: `/login`,
    })
  }
})

function handleTweetSuccess(tweet) {
  closeModal()
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

onBeforeMount(() => {
  initAuth()
})
</script>

<style scoped></style>
