<template>
  <div
    class="fixed flex flex-col items-center md:items-start gap-6 top-0 p-4 lg:p-6 h-screen"
  >
    <div
      class="w-min rounded-full hover:bg-sky-100 dark:hover:bg-neutral-900 p-2 mb-2 -mt-1"
    >
      <NuxtLink to="/">
        <LogoTwitter classes="w-6" />
      </NuxtLink>
    </div>

    <SideLeftItem active>
      <HomeIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">Home</p>
    </SideLeftItem>

    <SideLeftItem>
      <BellIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">Notifications</p>
    </SideLeftItem>

    <UIButton @click="handleTweetButton" liquid class="hidden md:block">
      Tweet
    </UIButton>

    <UIButton @click="handleTweetButton" size="sm" class="block md:hidden">
      <PlusIcon class="w-5 h-5" />
    </UIButton>

    <br />
    <button
      @click="handleToggleOption"
      class="mt-auto flex gap-3 w-full items-center relative"
    >
      <img
        :src="user.profileImage"
        class="w-8 h-8 flex-none rounded-full object-cover"
      />
      <div class="hidden md:block">
        <h3 class="text-sm text-neutral-900 font-bold">{{ user.name }}</h3>
        <p class="text-neutral-700 text-xs">@{{ user.username }}</p>
      </div>

      <div
        class="p-2 w-min ml-auto rounded-full text-neutral-800 dark:text-neutral-300 hover:bg-sky-50 dark:hover:bg-neutral-900 hidden md:block"
      >
        <EllipsisVerticalIcon class="w-5 h-5" />
      </div>

      <button
        v-show="activeOption"
        @click.stop="handleLogout"
        class="absolute w-[200px] h-10 p-2 bg-neutral-50 hover:bg-red-100 -top-16 left-0 text-left border border-red-200 rounded-full"
      >
        <p class="text-red-700 px-3 text-sm font-semibold">
          Logout @{{ user.username }}
        </p>
      </button>
    </button>
  </div>
</template>

<script setup>
import { HomeIcon } from "@heroicons/vue/24/solid"
import {
  BellIcon,
  PlusIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/outline"

const { openModal } = useTweet()
const { useAuthUser, logoutUser } = useAuth()
const user = useAuthUser()
const activeOption = ref(false)

function handleTweetButton() {
  openModal()
}

function handleToggleOption() {
  activeOption.value = !activeOption.value
}

async function handleLogout() {
  await logoutUser()
  navigateTo({
    path: "/login",
  })
}
</script>
