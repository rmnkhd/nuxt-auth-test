<template>
  <div>
    <header
        class="d-flex justify-content-between align-items-center bg-light px-4 py-3 mb-4 rounded-bottom-3"
    >
      <h5 class="m-0 text-dark fw-semibold">لیدو</h5>
      <button
          class="btn btn-link text-danger text-decoration-none fw-semibold px-2"
          @click="logout"
      >
        {{ $t('exit')}}
      </button>
    </header>

    <div class="container mt-4">
      <h1 class="text-end text-primary mb-5">{{ $t('dashboard')}}</h1>
      <div class="d-flex align-items-center">
        <p class="text-end text-secondary fs-3 fw-medium">{{$t('email')}}:</p>
        <p class="text-end text-primary fs-5 fw-medium pe-2">{{StorageService.get('user')}}</p>
      </div>
    </div>
  </div>
</template>

<script>

// Stores
import { useAuthStore } from '@/store/auth.js'

// Services
import TokenService from '@/services/token.service.js'
import StorageService from "~/services/storage.service.js";

export default {
  name: 'Dashboard',

  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    function logout() {
      TokenService.clear()
      authStore.logout()
      router.push('/login')
    }

    return {
      logout,
      StorageService
    }
  }
}

</script>

