<template>
  <button
    class="rounded-full bg-blue-500 dark:bg-blue-800 text-neutral-100 font-bold text-xs disabled:bg-blue-400 disabled:cursor-not-allowed"
    :class="classes"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  liquid: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
})

const buttonPadding = computed(() => {
  switch (props.size) {
    case "lg":
      return "px-5 py-2"
    case "md":
      return "px-4 py-2"
    default:
      return "p-2"
  }
})

const classes = computed(
  () => `${buttonPadding.value} ${props.liquid ? "w-full" : "w-min"}`
)
</script>
