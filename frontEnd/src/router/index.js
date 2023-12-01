import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import SalesView from '../views/SalesView.vue'
import SelectTeam from '../views/SelectTeamView.vue'
import PartidaView from '../views/PartidaView.vue'
import PreguntaView from '../views/PreguntaView.vue'
import totalVotacions from '../views/totalVotacions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/sales',
      name: 'sales',
      component: SalesView
    },
    {
      path: '/sala',
      name: 'sala',
      component: SelectTeam
    },
    {
      path: '/partida',
      name: 'partida',
      component: PartidaView
    },
    {
      path: '/pregunta',
      name: 'pregunta',
      component: PreguntaView
    },
    {
      path: '/totalVotacions',
      name: 'totalVotacions',
      component: totalVotacions
    }
  ]
})

export default router