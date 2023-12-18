import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import CrearSalaView from '../views/CrearSalaView.vue'
import SalesView from '../views/SalesView.vue'
import SelectTeam from '../views/SelectTeamView.vue'
import PartidaView from '../views/PartidaView.vue'
import PreguntaView from '../views/PreguntaView.vue'
import totalVotacions from '../views/totalVotacions.vue'
import ResultatsView from '../views/ResultatsView.vue'
import ResultatsFinalsView from '../views/ResultatsFinalsView.vue'
import RegisterView from '../views/RegisterView.vue'
import PolitiquesPrivacitatView from '../views/PolitiquesPrivView.vue'
import NormesView from '../views/NormesView.vue'
import PerfilView from '../views/PerfilView.vue'

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
      path: '/perfil',
      name: 'perfil',
      component: PerfilView
    },
    {
      path: '/crearSala',
      name: 'crearSala',
      component: CrearSalaView
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
    },
    {
      path: '/resultats',
      name: 'resultats',
      component: ResultatsView
    },
    {
      path: '/resultatsFinals',
      name: 'resultatsFinals',
      component: ResultatsFinalsView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/politiquesPrivacitat',
      name: 'politiquesPrivacitat',
      component: PolitiquesPrivacitatView
    },
    {
      path: '/normes',
      name: 'normes',
      component: NormesView
    },
  ]
})

export default router