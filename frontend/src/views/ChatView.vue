// src/views/ChatView.vue
<script setup lang="ts">
import { ref } from 'vue';

const prompt = ref(''); // Armazena o texto do prompt do usuário
const generatedText = ref(''); // Armazena a resposta da API do Gemini
const isLoading = ref(false); // Indica se a requisição está em andamento
const error = ref(''); // Armazena mensagens de erro

// Função para enviar o prompt para o backend
const sendPrompt = async () => {
  isLoading.value = true;
  error.value = '';
  generatedText.value = ''; // Limpa a resposta anterior

  try {
    const response = await fetch('http://localhost:3000/api/gemini/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt.value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro desconhecido ao chamar o backend.');
    }

    const data = await response.json();
    generatedText.value = data.generatedText; // Armazena o texto gerado

  } catch (err: any) {
    error.value = err.message || 'Ocorreu um erro ao se comunicar com a API.';
    console.error('Erro no frontend ao chamar API Gemini:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">Chat com Gemini AI</h2>

      <div class="mb-4">
        <label for="prompt" class="block text-gray-700 text-sm font-bold mb-2">Seu Prompt:</label>
        <textarea
          id="prompt"
          v-model="prompt"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 h-32 resize-none"
          placeholder="Digite sua pergunta ou comando para a IA..."
        ></textarea>
      </div>

      <div class="flex items-center justify-between mb-6">
        <button
          @click="sendPrompt"
          :disabled="isLoading || !prompt.trim()"
          class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Gerando...' : 'Enviar Prompt' }}
        </button>
      </div>

      <p v-if="error" class="text-red-500 text-xs italic mb-4 text-center">{{ error }}</p>

      <div v-if="generatedText" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Resposta da IA:</h3>
        <p class="text-gray-700 whitespace-pre-wrap">{{ generatedText }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos específicos se necessário */
</style>

