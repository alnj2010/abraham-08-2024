import { createRouter, createWebHistory } from 'vue-router'
import PokeHomeView from '@/views/PokeHomeView.vue'
import PokeTeamView from '@/views/PokeTeamView.vue'
import PokeDetailView from '@/views/PokeDetailView.vue'
import { useTeamStore } from '@/stores/team'

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
    },
    {
      path: '/team/:id',
      name: 'pokemon',
      component: PokeDetailView,
      beforeEnter: (to) => {
        // TODO remember redirect to home
        const { myTeam } = useTeamStore()
        return myTeam.has(parseInt(to.params.id as string))
      }
    }
  ]
})

export default router
