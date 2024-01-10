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
import PerfilView from '../views/PerfilView.vue'
import TutorialView from '../views/TutorialView.vue'

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
      path: '/tutorial',
      name: 'tutorial',
      component: TutorialView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication(); // Comprovem si l'usuari està autenticat

  if (to.path !== '/' && to.path !== '/login' && to.path !== '/register' && to.path !== '/tutorial' && !isAuthenticated) {
    // Si l'usuari no està autenticat i intenta accedir a una ruta que no sigui la home
    next('/login'); // Redirigim al login
  } else {
    next(); // Continuem
  }
});

function checkAuthentication() {
  // Comprovem si l'usuari està autenticat
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? true : false;
}

export default router