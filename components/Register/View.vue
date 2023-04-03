<template>
  <Head>
    <Title>Register | Twitter</Title>
  </Head>
  <div class="h-screen flex">
    <div class="flex-1 relative hidden w-0 lg:block">
      <img
        class="absolute inset-0 object-cover w-full h-full"
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        alt="login-page-cover"
      />
    </div>

    <div
      class="flex-1 flex justify-center lg:flex-none lg:w-96 h-full items-center px-16"
    >
      <div class="flex flex-col items-center space-y-6 w-full max-w-md">
        <h1 class="font-bold text-lg text-neutral-800 dark:text-neutral-200">
          Create Account
        </h1>
        <p
          v-if="error"
          class="bg-red-500/90 p-2 rounded-2xl text-neutral-100 font-semibold text-sm w-full flex items-center gap-2"
        >
          <span class=""><LogoError /></span>
          {{ error }}
        </p>
        <div>
          <div class="w-20 h-20">
            <input
              ref="pictureRef"
              type="file"
              hidden
              accept=".gif, .jpeg, .jpg"
              @change="handleInputFileChange"
            />
            <img
              class="w-full h-full object-cover rounded-full"
              :src="
                pictureURL ||
                'https://www.gotknowhow.com/media/avatars/images/default/large-user-avatar.png'
              "
            />
          </div>

          <button @click="handleChangeProfile" class="text-blue-500 text-sm">
            Change Photo
          </button>
        </div>
        <UIInput
          v-model:input-value="InputValue.name"
          input-value=""
          label="Name"
          placeholder="Your name"
        />
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
        <UIInput
          v-model:input-value="InputValue.confirmPassword"
          input-value=""
          label="Confirm Password"
          placeholder="********"
          type="password"
        />

        <button
          @click="handleRegister"
          :disabled="loading"
          class="bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed rounded-full w-full text-sm py-2 text-neutral-50 font-semibold hover:bg-blue-600"
        >
          <LogoLoading v-if="loading" />
          <p v-else>Register</p>
        </button>

        <p class="text-xs text-neutral-900 dark:text-neutral-200">
          Already have account ?
          <NuxtLink class="text-blue-500 font-medium" to="/login"
            >Login</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { register } = useRegister()

const InputValue = reactive({
  username: "",
  name: "",
  password: "",
  confirmPassword: "",
})
const error = ref("")
const loading = ref(false)
const pictureRef = ref(null)
const pictureURL = ref("")
const picture = ref(null)

const handleRegister = async () => {
  if (!InputValue.username || !InputValue.password) return
  if (InputValue.password !== InputValue.confirmPassword) {
    error.value = "Password and confirm password must match"
  }
  try {
    loading.value = true
    await register(
      {
        ...InputValue,
      },
      picture.value
    )
    navigateTo({
      path: "/login",
    })
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  if (error) {
    if (InputValue.username || InputValue.password || InputValue.name) {
      error.value = ""
    }
  }
})

function handleChangeProfile() {
  pictureRef.value?.click()
}

function handleInputFileChange(event) {
  const file = event.target.files[0]
  picture.value = file

  //Display image to user
  const reader = new FileReader()
  reader.onload = (result) => {
    pictureURL.value = result.target.result
  }
  reader.readAsDataURL(file)
}
</script>
