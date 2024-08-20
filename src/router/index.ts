import { createRouter, createWebHistory } from 'vue-router'
import PokeHomeView from '../views/PokeHomeView.vue'
import PokeTeamView from '../views/PokeTeamView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokeHomeView
    },
    {
      path: '/team',
      name: 'team',
      component: PokeTeamView
    }
  ]
})

export default router
