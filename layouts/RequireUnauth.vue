<template>
  <div>
    <div v-if="loading || user" class="min-h-screen flex items-center">
      <LogoLoading />
    </div>

    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup>
const { useAuthUser, useAuthLoading, initAuth } = useAuth()
const user = useAuthUser()
const loading = useAuthLoading()

watchEffect(() => {
  if (user.value && !loading.value) {
    navigateTo({
      path: `/`,
    })
  }
})

onBeforeMount(() => {
  initAuth()
})
</script>
