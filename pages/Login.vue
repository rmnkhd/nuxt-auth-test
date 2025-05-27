<template>
  <div class="login-container d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow p-4 rounded-4" style="width: 100%; max-width: 400px;">
      <h2 class="text-center mb-4 text-primary fw-bold">{{ $t('login to account')}}</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="email" class="form-label">{{ $t('email') }}</label>
          <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
              placeholder="you@example.com"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">{{ $t('password') }}</label>
          <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
              placeholder="********"
          />
        </div>

        <button type="submit" class="btn btn-primary w-100 mt-3">{{ $t('login') }}</button>
      </form>
    </div>
  </div>
</template>

<script>
// Vue
import { ref } from 'vue'

export default {
  name: 'Login',

  setup() {
    const email = ref('')
    const password = ref('')

    function handleSubmit() {
      console.log('📥 Email:', email.value)
      console.log('🔐 Password:', password.value)
    }

    return {
      email,
      password,

      handleSubmit
    };
  }
};

</script>

