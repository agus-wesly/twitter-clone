<template>
  <div class="w-full">
    <label class="block text-sm text-neutral-800 font-semibold mb-1">{{
      props.label
    }}</label>
    <input
      class="block rounded-full ring-[1px] border-none px-3 py-2 w-full text-sm"
      :class="[
        props.error
          ? 'ring-red-500 focus:ring-red-400'
          : 'ring-neutral-400 focus:ring-sky-400',
      ]"
      :type="props.type"
      :value="props.inputValue"
      :placeholder="props.placeholder"
      @input="handleInputChange"
      @blur="emits('validate')"
    />
    <p v-if="props.error" class="text-xs text-red-400 ml-2 mt-1 capitalize">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup>
const emits = defineEmits(["update:inputValue", "validate"])
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
  error: {
    type: String,
    default: "",
  },
})

function handleInputChange(e) {
  emits("update:inputValue", e.target.value)
  emits("validate")
}
</script>
