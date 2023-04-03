<template>
  <div
    class="fixed bottom-0 left-0 w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex sm:hidden justify-around items-center text-neutral-800 dark:text-neutral-400"
  >
    <NuxtLink
      to="/"
      class="text-xs flex flex-col items-center rounded-full p-2 hover:bg-sky-50 hover:text-blue-700 dark:hover:bg-neutral-900/20 dark:hover:text-blue-400"
    >
      <HomeIcon class="w-5 h-5" />
      <p>Home</p>
    </NuxtLink>

    <NuxtLink
      to="/search"
      class="text-xs flex flex-col items-center rounded-full p-2 px-3 hover:bg-sky-50 hover:text-blue-700 dark:hover:bg-neutral-900/20 dark:hover:text-blue-400"
    >
      <MagnifyingGlassIcon class="w-5 h-5" />
      <p>Search</p>
    </NuxtLink>

    <NuxtLink
      to="/notification"
      class="text-xs flex flex-col items-center rounded-full p-2 px-3 hover:bg-sky-50 hover:text-blue-700 dark:hover:bg-neutral-900/20 dark:hover:text-blue-400"
    >
      <HeartIcon class="w-5 h-5" />
      <p>Notification</p>
    </NuxtLink>

    <NuxtLink
      to="/profile"
      class="text-xs flex flex-col items-center rounded-full p-2 px-3 hover:bg-sky-50 hover:text-blue-700 dark:hover:bg-neutral-900/20 dark:hover:text-blue-400"
    >
      <UserIcon class="w-5 h-5" />
      <p>Account</p>
    </NuxtLink>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
} from "@heroicons/vue/24/outline"
</script>
