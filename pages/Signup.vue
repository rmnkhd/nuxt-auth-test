<template>
  <div class="login-container d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow p-4 rounded-4 signup-card-container">
      <h2 class="text-center mb-4 text-primary fw-bold">{{ $t('create account') }}</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="email" class="form-label">{{ $t('email') }}</label>
          <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              :class="{ 'is-invalid': $v.email.$error }"
              placeholder="you@example.com"
          />
          <div class="invalid-feedback" v-if="$v.email.$error">
            {{ $t('invalid email') }}
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">{{ $t('password') }}</label>
          <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              :class="{ 'is-invalid': $v.password.$error }"
              placeholder="********"
          />
          <div class="invalid-feedback" v-if="$v.password.$error">
            {{ $t('password required') }}
          </div>
        </div>

        <div class="mb-3">
          <label for="repeatPassword" class="form-label">{{ $t('repeat password') }}</label>
          <input
              type="password"
              class="form-control"
              id="repeatPassword"
              v-model="repeatPassword"
              :class="{ 'is-invalid': $v.repeatPassword.$error }"
              placeholder="********"
          />
          <div class="invalid-feedback" v-if="$v.repeatPassword.$error">
            {{ $t('passwords do not match') }}
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100 mt-3">{{ $t('register') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

// validators
import useVuelidate from '@vuelidate/core'
import { required, sameAs } from '@vuelidate/validators'

// Stores
import { useAuthStore } from "~/store/auth.js"

// Composable
import { useToast } from "~/composables/toast.composable.js"

// Enums
import ThemeColor from "~/enums/ThemeColor.js"

// Services
import { t } from "~/services/language.service.js"
import TokenService from "~/services/token.service.js"
import StorageService from "~/services/storage.service.js";

export default {
  name: 'Signup',

  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const { showToast } = useToast()

    const email = ref('')
    const password = ref('')
    const repeatPassword = ref('')

    const rules = {
      email: { required, email },
      password: { required },
      repeatPassword: { required, sameAsPassword: sameAs(password) }
    }

    const v$ = useVuelidate(rules, { email, password, repeatPassword })

    async function handleSubmit() {
      v$.value.$touch()
      if (v$.value.$invalid) return

      try {
        const response = await authStore.signup(email.value, password.value)

        showToast({
          theme: ThemeColor.SUCCESS,
          body: t('login success'),
        })

        TokenService.set(response.accessToken)
        StorageService.set('user' , response.email)
        return router.push('/')

      } catch (error) {
        showToast({
          theme: ThemeColor.DANGER,
          body: error.message
        })
      }
    }

    return {
      email,
      password,
      repeatPassword,
      handleSubmit,
      $v: v$
    }
  }
}
</script>
