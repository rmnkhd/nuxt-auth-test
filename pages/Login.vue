<template>
  <div class="login-container d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow p-4 rounded-4" style="width: 100%; max-width: 400px;">
      <h2 class="text-center mb-4 text-primary fw-bold">{{ $t('login to account') }}</h2>

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

        <button type="submit" class="btn btn-primary w-100 mt-3">{{ $t('login') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

// Validators
import useVuelidate from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'

// Stores
import { useAuthStore } from "~/store/auth.js"

// Composable
import { useToast } from '@/composables/toast.composable'

// Enums
import ThemeColor from "~/enums/ThemeColor.js"
import FirebaseMessages from "~/enums/FirebaseMessages.js"

// Services
import { t } from "@/services/language.service"
import TokenService from "~/services/token.service.js"

export default {
  name: 'Login',

  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { showToast } = useToast()

    const email = ref('')
    const password = ref('')

    const rules = {
      email: { required, email: emailValidator },
      password: { required }
    }

    const v$ = useVuelidate(rules, { email, password })

    async function handleSubmit() {
      v$.value.$touch()
      if (v$.value.$invalid) return

      try {
        const response = await authStore.login(email.value, password.value)

        showToast({
          theme: ThemeColor.SUCCESS,
          body: t('login success'),
        })

        TokenService.set(response.accessToken)
        return router.push('/dashboard')

      } catch (error) {
        showToast({
          theme: ThemeColor.DANGER,
          body:
              error.message === FirebaseMessages.INVALID_LOGIN_CREDENTIALS
                  ? t('there is no user with this email in the system.')
                  : error.message,
        })
      }
    }

    return {
      email,
      password,
      handleSubmit,
      $v: v$
    }
  }
}
</script>
