<template>
  <div
    class="rounded border border-gray-200 dark:border-gray-600 bg-neutral-100 dark:bg-neutral-900 divide-y dark:divide-neutral-600"
  >
    <h1
      class="text-neutral-900 dark:text-neutral-200 font-extrabold text-lg p-2"
    >
      {{ props.title }}
    </h1>

    <slot />

    <div>
      <p class="text-sky-500 text-sm p-2 font-semibold cursor-pointer">
        Show more
      </p>
    </div>
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
