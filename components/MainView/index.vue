<template>
  <div
    class="lg:border-x border-gray-200 dark:border-neutral-600 min-h-screen lg:py-6"
  >
    <div
      class="sticky top-0 w-full bg-neutral-50/70 dark:bg-neutral-800/70 backdrop-blur-xl flex items-center p-4 gap-4"
    >
      <NuxtLink to="/" class="block sm:hidden">
        <LogoTwitter classes="w-6" />
      </NuxtLink>
      <h1 class="text-lg font-extrabold text-neutral-800 dark:text-neutral-200">
        {{ props.title }}
      </h1>
    </div>

    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
