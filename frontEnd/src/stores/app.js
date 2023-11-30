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
    salaActual: '',
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
      text_pregunta: 'Pregunta 1',
      respostes: [{ id: 1, text_resposta: 'resposta 1'}, 
                  { id: 2, text_resposta: 'resposta 2'}, 
                  { id: 3, text_resposta: 'resposta 3'}, 
                  { id: 4, text_resposta: 'resposta 4'}],
  },

    //100%
    temporitzador: '',
    torn: '',
    votacioEnCurs: false,
    base: '',
  }),
  actions: {

    //getters
    getSales() {
      return this.sales
    },
    getUserInfo() {
      return this.userInfo
    },
    getSalaActual() {
      return this.salaActual
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
    getTemporitzador() {
      return this.temporitzador
    },
    getTorn() {
      return this.torn
    },

    //setters
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setSalaActual(salaActual) {
      this.salaActual = salaActual
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
    setTemporitzador(temporitzador) {
      this.temporitzador = temporitzador
    },
    setTorn(torn) {
      this.torn = torn
    },
    setVotacioEnCurs(votacioEnCurs) {
      this.votacioEnCurs = votacioEnCurs
    },
    setBase(base) {
      this.base = base
    },
    setPreguntaAct(preguntaAct) {
      this.preguntaAct = preguntaAct
    },

    //socket

    entrarSala(sala_id) {
      this.socket.emit('sala-seleccionada', sala_id)
    },
    selectTeam(team) {
      this.socket.emit('equip-seleccionat', team)
    },
    enviarBaseVotada(base) {
      this.socket.emit('base-votada', base)
    },
    enviarResposta(resposta_id) {
      this.socket.emit('enviarResposta', resposta_id)
    },
  },
})
