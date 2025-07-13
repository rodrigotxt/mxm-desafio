<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('input_email')
const password = ref('input_password')
const errorMessage = ref('error_message')

// Função para lidar com o envio do formulário de login
const handleLogin = async () => {
  errorMessage.value = ''
  try {
    // Chama a ação de login do store Pinia
    await authStore.login(email.value, password.value)
    // Se o login for bem-sucedido, redireciona para o dashboard
    router.push('/dashboard')
  } catch (error: any) {
    // Se houver um erro, exibe a mensagem de erro
    errorMessage.value = error.message || 'Erro ao fazer login.'
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            placeholder="seu@email.com"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            placeholder="********"
            required
          />
        </div>
        <p v-if="errorMessage" class="text-red-500 text-xs italic mb-4">{{ errorMessage }}</p>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 w-full"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos se necessário */
</style>

