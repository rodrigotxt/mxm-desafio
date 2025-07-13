<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-blue-600 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold rounded-md">Meu App Completo</h1>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <!-- Link para a página inicial (pública) -->
              <RouterLink to="/" class="hover:underline rounded-md p-2">Início</RouterLink>
            </li>
            <li>
              <!-- Link para o dashboard (autenticado) -->
              <RouterLink to="/dashboard" class="hover:underline rounded-md p-2">Dashboard</RouterLink>
            </li>
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
        <p>&copy; 2025 Meu App. Todos os direitos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>

</style>

