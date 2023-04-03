<template>
  <div>
    <AuthView @on-success="handleAuthSuccess" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "require-unauth",
})

function handleAuthSuccess() {
  navigateTo({
    path: "/",
  })
}
</script>
