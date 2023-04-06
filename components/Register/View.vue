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
      class="flex-1 flex justify-center lg:flex-none lg:w-96 h-full items-center px-8"
    >
      <div class="flex flex-col items-center space-y-4 w-full max-w-md py-10">
        <h1 class="font-bold text-lg text-neutral-800 dark:text-neutral-200">
          Create Account
        </h1>

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
          label="Name"
          placeholder="Your name"
          v-model:input-value="InputValue.name"
          @validate="validate('name')"
          :error="error.name"
        />

        <UIInput
          v-model:input-value="InputValue.username"
          input-value=""
          label="Username"
          placeholder="@username"
          @validate="validate('username')"
          :error="error.username"
        />
        <UIInput
          v-model:input-value="InputValue.email"
          input-value=""
          label="Email"
          placeholder="Your email"
          @validate="validate('email')"
          :error="error.email"
        />
        <UIInput
          v-model:input-value="InputValue.password"
          label="Password"
          placeholder="********"
          type="password"
          @validate="validate('password')"
          :error="error.password"
        />
        <UIInput
          v-model:input-value="InputValue.confirmPassword"
          input-value=""
          label="Confirm Password"
          placeholder="********"
          type="password"
          @validate="validate('confirmPassword')"
          :error="error.confirmPassword"
        />

        <button
          @click="handleRegister"
          :disabled="loading || fieldStillError"
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
import * as yup from "yup"

const { register } = useRegister()

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const registerFormSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Confirm password must match password"),
  username: yup.string().required(),
  name: yup.string().required(),
})

const InputValue = reactive({
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
})

const error = reactive({
  username: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
})
const loading = ref(false)
const pictureRef = ref(null)
const pictureURL = ref("")
const picture = ref(null)

const fieldStillError = computed(() => {
  return (
    Object.values(error).some((val) => Boolean(val)) ||
    Object.values(InputValue).some((val) => !Boolean(val))
  )
})

const handleRegister = async () => {
  if (fieldStillError.value) {
    return
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

function validate(path) {
  registerFormSchema
    .validateAt(path, InputValue)
    .then(() => {
      error[path] = ""
    })
    .catch((err) => {
      error[err.path] = err.message
    })
}

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
