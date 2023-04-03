<template>
  <div class="w-full">
    <label class="block text-sm text-neutral-800 font-semibold mb-1">{{
      props.label
    }}</label>
    <input
      @input="(e) => emits('update:inputValue', e.target.value)"
      :type="props.type"
      :value="props.inputValue"
      :placeholder="props.placeholder"
      class="block rounded-full ring-[1px] ring-neutral-400 border-none px-3 py-2 w-full active:ring-sky-400 text-sm"
    />
  </div>
</template>

<script setup>
const emits = defineEmits(["update:inputValue"])
const props = defineProps({
  inputValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
})
</script>
