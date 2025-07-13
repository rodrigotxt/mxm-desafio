// auth.ts
import { defineStore } from 'pinia'

// Define e exporta o store de autenticação
export const useAuthStore = defineStore('auth', {
  // O estado (data) do store
  state: () => ({
    isAuthenticated: false,
    userId: null as string | null, // Armazena o ID do usuário, null se não autenticado
  }),

  getters: {
    // Retorna o status de autenticação
    getIsAuthenticated: (state) => state.isAuthenticated,
    // Retorna o ID do usuário
    getUserId: (state) => state.userId,
  },

  actions: {
    // Mockup do processo de login
    async login(email: string, password: string) {
        // TODO: fazer a autenticação com o backend
      if (email === 'test@example.com' && password === 'password123') {
        this.isAuthenticated = true
        this.userId = 'user-123'
        console.log('Login bem-sucedido!')
      } else {
        throw new Error('Email ou senha inválidos.')
      }
    },

    // Mockup do processo de logout
    logout() {
      this.isAuthenticated = false
      this.userId = null
      console.log('Logout realizado.')
    },

    // Verificar o status de autenticação
    checkAuthStatus() {
      // TODO: verificar um token no localStorage/sessionStorage
      // Apenas em dev, listar o status atual.
      console.log('Status de autenticação:', this.isAuthenticated)
    },
  },
})

