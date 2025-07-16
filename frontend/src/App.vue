// src/App.vue
<script setup lang="ts">
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const appName = import.meta.env.VITE_APP_NAME;

const authStore = useAuthStore()
const router = useRouter()

// Função para lidar com o logout
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-600 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold rounded-md">{{ appName }}</h1>
        <nav>
          <ul class="flex space-x-4">
            <!-- <li>
              Link para o dashboard (autenticado) --
              <RouterLink to="/dashboard" class="hover:underline rounded-md p-2">Dashboard</RouterLink>
            </li> -->
            <li v-if="authStore.isAuthenticated"><button @click="handleLogout" class="hover:underline rounded-md p-2">Sair</button></li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto p-4 flex items-center justify-center">
      <!-- Onde os componentes das rotas serão renderizados -->
      <RouterView />
    </main>

    <footer class="bg-gray-800 text-white p-4 text-center shadow-inner">
      <div class="container mx-auto">
        <p>&copy; 2025 {{ appName }}. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>