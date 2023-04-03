<template>
  <div
    class="flex items-center gap-1 text-xs group cursor-pointer text-gray-500 dark:text-gray-400"
  >
    <div
      :class="`group-hover:text-${props.color}-700 p-2 rounded-full group-hover:bg-${props.color}-50`"
    >
      <slot name="icon" :classes="[props.compact ? 'w-6 h-6' : 'w-5 h-5']" />
    </div>
    <p v-if="!props.compact" :class="`group-hover:text-${props.color}-700`">
      <slot />
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>
