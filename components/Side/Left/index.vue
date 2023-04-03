<template>
  <div class="space-y-5 flex flex-col sticky top-0 p-4 lg:p-6">
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
      <HashtagIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">Explore</p>
    </SideLeftItem>

    <SideLeftItem>
      <BellIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">Notifications</p>
    </SideLeftItem>

    <SideLeftItem>
      <InboxIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">Inbox</p>
    </SideLeftItem>

    <SideLeftItem>
      <BookmarkIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">Bookmarks</p>
    </SideLeftItem>

    <SideLeftItem>
      <DocumentArrowUpIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">Lists</p>
    </SideLeftItem>

    <SideLeftItem>
      <UserIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">Profile</p>
    </SideLeftItem>

    <SideLeftItem>
      <EllipsisHorizontalIcon class="w-5 h-5 flex-none" />
      <p class="text-sm hidden md:block">More</p>
    </SideLeftItem>

    <UIButton @click="handleTweetButton" liquid class="hidden md:block">
      Tweet
    </UIButton>

    <UIButton @click="handleTweetButton" size="sm" class="block md:hidden">
      <PlusIcon class="w-5 h-5" />
    </UIButton>
  </div>
</template>

<script setup>
import { HomeIcon } from "@heroicons/vue/24/solid"
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentArrowUpIcon,
  UserIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
} from "@heroicons/vue/24/outline"

const { openModal } = useTweet()
function handleTweetButton() {
  openModal()
}
</script>
