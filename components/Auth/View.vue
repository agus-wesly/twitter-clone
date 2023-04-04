<template>
  <div class="h-screen flex">
    <div class="flex-1 relative hidden w-0 lg:block">
      <img
        class="absolute inset-0 object-cover w-full h-full"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="login-page-cover"
      />
    </div>

    <div
      class="flex-1 flex justify-center lg:flex-none lg:w-96 h-full items-center px-8"
    >
      <div class="flex flex-col items-center space-y-6 w-full max-w-md">
        <LogoTwitter classes="w-6" />
        <p
          v-if="error"
          class="bg-red-500/90 p-2 rounded-2xl text-neutral-100 font-semibold text-sm w-full flex items-center gap-2"
        >
          <span class=""><LogoError /></span>
          {{ error }}
        </p>
        <UIInput
          v-model:input-value="InputValue.username"
          input-value=""
          label="Username"
          placeholder="@username"
        />
        <UIInput
          v-model:input-value="InputValue.password"
          label="Password"
          placeholder="********"
          type="password"
        />

        <button
          @click="handleLogin"
          :disabled="loading"
          class="bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-full w-full text-sm py-2 text-neutral-50 font-semibold hover:bg-blue-600"
        >
          <LogoLoading v-if="loading" />
          <p v-else>Login</p>
        </button>

        <p class="text-xs text-neutral-900 dark:text-neutral-200">
          Don't have account ?
          <NuxtLink class="text-blue-500 font-medium" to="/register"
            >Register now</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["onSuccess"])
const InputValue = reactive({
  username: "",
  password: "",
})
const error = ref("")
const loading = ref(false)

const { loginUser } = useAuth()

const handleLogin = async () => {
  if (!InputValue.username || !InputValue.password) return
  try {
    loading.value = true
    await loginUser(InputValue.username, InputValue.password)
    emits("onSuccess")
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  if (error) {
    if (InputValue.username || InputValue.password) {
      error.value = ""
    }
  }
})
</script>
