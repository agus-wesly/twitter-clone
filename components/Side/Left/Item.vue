<template>
  <div
    :class="props.active ? 'font-extrabold' : 'font-semibold'"
    class="flex gap-4 text-neutral-800 dark:text-neutral-300 hover:bg-sky-50 dark:hover:bg-neutral-900 cursor-pointer rounded-full w-min sm:min-w-max md:w-full py-2 items-center"
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
})
</script>
