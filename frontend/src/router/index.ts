import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Importa os componentes das views
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: { requiresAuth: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    // TODO: Adicionar outras rotas ...
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() // Acessa o store de autenticação
  const requiresAuth = to.meta.requiresAuth // Verifica se a rota precisa de autenticacao

  // Se a rota precisa autenticacao e o usuario nao esta autenticado
  if (requiresAuth && !authStore.isAuthenticated) {
    // Redireciona para a página de login
    next('/login')
  } else {
    // Continua navegacao
    next()
  }
})

export default router

