<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

// Função para lidar com o logout
const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
    <h1 class="text-4xl font-extrabold text-green-700 mb-4">Bem-vindo ao Dashboard!</h1>
    <p class="text-lg text-gray-600 mb-6">Você está logado e pode acessar conteúdo protegido.</p>
    <p class="text-md text-gray-500 mb-8">
      Seu ID de usuário (simulado): <span class="font-bold text-blue-600">{{ authStore.userId }}</span>
    </p>
    <button
      @click="handleLogout"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
    >
      Sair
    </button>
  </div>
</template>

<style scoped>
/* Estilos se necessário */
</style>

