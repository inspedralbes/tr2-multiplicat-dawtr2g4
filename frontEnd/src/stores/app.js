import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    //local
    userInfo: {
      username: '',
      password: '',
    },
    team: '',
    jocInfo: {
      baseAct: '',
      resposta: '',
    },
    //socket: io('http://localhost:3000'),
    sales: [],
    salaInfo: {
      id: '',
      name: '',
      categoria: '',
      data: '',
    },
    teams: {
      team1: [],
      team2: [],
    },
    preguntaAct: {
      pregunta: '',
      respostes: [],
    },
  }),
  getters: {
    getSales() {
      return this.sales
    },
    getUserInfo() {
      return this.userInfo
    },
    getSalaInfo() {
      return this.salaInfo
    },
    getTeams() {
      return this.teams
    },
    getJocInfo() {
      return this.jocInfo
    },
    getPreguntaAct() {
      return this.preguntaAct
    },
  },
  setters: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setSalaInfo(salaInfo) {
      this.salaInfo = salaInfo
    },
    setTeams(teams) {
      this.teams = teams
    },
    setJocInfo(jocInfo) {
      this.jocInfo = jocInfo
    },
    setPreguntaAct(preguntaAct) {
      this.preguntaAct = preguntaAct
    },
    setSales(sales) {
      this.sales = sales
    },
  },
  actions: {
    entrarSala(sala_id) {
      this.socket.emit('entrarSala', sala_id)
    },
    enviarResposta(resposta_id) {
      this.socket.emit('enviarResposta', resposta_id)
    }
  },
})


