<template>
  <form
    @submit.prevent="handleSearch"
    class="rounded-full flex items-center text-neutral-600 dark:text-neutral-200 bg-gray-200 px-2 dark:bg-neutral-900"
  >
    <button type="submit">
      <SearchIcon class="w-5 h-5" />
    </button>

    <input
      v-model="search"
      class="bg-transparent outline-none p-2 text-sm font-semibold w-full"
      placeholder="Search something"
    />
  </form>
</template>

<script setup>
import SearchIcon from "@heroicons/vue/24/outline/MagnifyingGlassIcon"

const search = ref("")

function handleSearch() {
  navigateTo({
    path: "/status/search",
    query: {
      q: search.value,
    },
  })
  search.value = ""
}
</script>
