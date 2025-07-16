// src/views/ChatView.vue
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'; // Importa o store de autenticação
import { marked } from 'marked';
import genioImgUrl from '@/assets/genio.jpg';

const authStore = useAuthStore(); // Acessa o store de autenticação

// Variáveis para o modal e entrada de ingredientes
const showModal = ref(false); // Controla a visibilidade do modal
const ingredientsInput = ref(''); // Armazena o texto dos ingredientes do usuário

// Variáveis para as opções do gênio
const selectedTemperament = ref('Normal'); // Temperamento selecionado (Normal, Irônico, Nervoso)
const selectedMode = ref('Normal'); // Modo selecionado (Normal, Restritivo)

// Variáveis para a resposta da IA e estado da requisição
const generatedText = ref(''); // Armazena a resposta da API do Gemini
const isLoading = ref(false); // Indica se a requisição está em andamento
const error = ref(''); // Armazena mensagens de erro

// URL da imagem/animação do Gênio da Cozinha (Placeholder)
// Por favor, substitua esta URL pela sua imagem real.
const genieImageUrl = genioImgUrl;


// Função para abrir o modal
const openModal = () => {
  showModal.value = true;
  // Opcional: Limpar inputs ao abrir o modal, se desejar
  // ingredientsInput.value = '';
  // error.value = '';
};

// Função para fechar o modal
const closeModal = () => {
  showModal.value = false;
};

// Função para enviar o pedido para o backend
const sendOrder = async () => {
  isLoading.value = true;
  error.value = '';
  generatedText.value = ''; // Limpa a resposta anterior

  // Fecha o modal imediatamente após o envio para uma melhor UX
  closeModal();

  // Verifica se o usuário está autenticado e se há um token
  if (!authStore.isAuthenticated || !authStore.token) {
    error.value = 'Você precisa estar logado para usar o Gênio da Cozinha.';
    isLoading.value = false;
    return;
  }

  // Validação básica do input de ingredientes
  if (!ingredientsInput.value.trim()) {
    error.value = 'Por favor, insira os ingredientes para o seu pedido.';
    isLoading.value = false;
    return;
  }

  // Constrói o prompt para o backend com todos os parâmetros
  const requestBody = {
    ingredients: ingredientsInput.value,
    temperament: selectedTemperament.value,
    mode: selectedMode.value,
  };

  console.log('Enviando pedido ao backend:', JSON.stringify(requestBody));

  try {
    const response = await fetch('http://localhost:3000/api/ia/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}` // Adiciona o token JWT aqui
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Resposta do backend:', response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro desconhecido ao chamar o backend.');
    }

    const data = await response.json();
    generatedText.value = data.generatedText; // Armazena o texto gerado

  } catch (err: any) {
    error.value = err.message || 'Ocorreu um erro ao se comunicar com o Gênio da Cozinha.';
    console.error('Erro no frontend ao chamar API Gemini:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Seu Gênio da Cozinha</h2>

      <!-- Imagem do Gênio da Cozinha -->
      <div class="mb-8">
        <img
          :src="genieImageUrl"
          alt="Gênio da Cozinha"
          class="mx-auto w-48 h-48 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          @click="openModal"
        />
        <p class="mt-4 text-gray-600">Clique no Gênio para fazer seu pedido!</p>
      </div>

      <!-- Área de exibição do resultado da IA -->
      <p v-if="error" class="text-red-500 text-xs italic mb-4 text-center">{{ error }}</p>

      <div v-if="isLoading" class="mt-6 flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <p class="ml-3 text-purple-600">A magia está acontecendo...</p>
      </div>

      <div v-if="generatedText" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">A Receita do Gênio:</h3>
        <div class="receita text-gray-700" v-html="marked(generatedText)"></div>
      </div>
    </div>

    <!-- Modal do Tailwind CSS -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div class="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>
        <h3 class="text-2xl font-bold text-center text-gray-800 mb-6">Faça Seu Pedido</h3>

        <div class="mb-4">
          <label for="ingredients" class="block text-gray-700 text-sm font-bold mb-2">Ingredientes:</label>
          <textarea
            id="ingredients"
            v-model="ingredientsInput"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 h-24 resize-none"
            placeholder="Insira os ingredientes e veja a magia acontecer!... ex: batata, arroz, feijão"
          ></textarea>
        </div>

        <!-- Opções de Temperamento do Gênio -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Temperamento do Gênio:</label>
          <div class="flex flex-wrap gap-4">
            <label class="inline-flex items-center">
              <input type="radio" v-model="selectedTemperament" value="Normal" class="form-radio text-purple-600" />
              <span class="ml-2 text-gray-700">Normal</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="selectedTemperament" value="Irônico" class="form-radio text-purple-600" />
              <span class="ml-2 text-gray-700">Irônico</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="selectedTemperament" value="Nervoso" class="form-radio text-purple-600" />
              <span class="ml-2 text-gray-700">Nervoso</span>
            </label>
          </div>
        </div>

        <!-- Opções de Modo -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2">Modo:</label>
          <div class="flex flex-wrap gap-4">
            <label class="inline-flex items-center">
              <input type="radio" v-model="selectedMode" value="Normal" class="form-radio text-purple-600" />
              <span class="ml-2 text-gray-700">Normal</span>
            </label>
            <label class="inline-flex items-center">
              <input type="radio" v-model="selectedMode" value="Restritivo" class="form-radio text-purple-600" />
              <span class="ml-2 text-gray-700">Restritivo (somente ingredientes citados)</span>
            </label>
          </div>
        </div>

        <button
          @click="sendOrder"
          :disabled="isLoading || !ingredientsInput.trim()"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Gerando...' : 'Pedir ao Gênio' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.receita p{
  margin-top: 1em;
}
</style>