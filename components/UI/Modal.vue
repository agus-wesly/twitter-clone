<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog
      as="div"
      @close="closeModal"
      class="h-screen overflow-auto bg-red-300"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll bg-black bg-opacity-25 h-full"
        />
      </TransitionChild>

      <div class="fixed h-[90vh] top-0 left-0 right-0 bottom-0">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <DialogPanel
            class="w-full max-w-md transform rounded-2xl bg-white max-h-screen overflow-auto dark:bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all"
          >
            <slot />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue"

const { useModalOpen, closeModal } = useTweet()
const isOpen = useModalOpen()
</script>
