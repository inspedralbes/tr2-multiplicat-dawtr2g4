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

    //100%
    temporitzador: '',
    torn: '',
    votacioEnCurs: false,
    base: '',
    preguntaAct: '',

    puntuacio: {
      equip1: [],
      equip2: []
    },
    outs: '',
    equipAtacant: '',
    respostes1: [],
    respostes2: [],
    totalVotacions: 0,
    totalJugadors: 0,
  }),
  actions: {

    //getters
    getSales() {
      return this.sales
    },
    getUserInfo() {
      return this.userInfo
    },
    getTeam() {
      return this.team
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
    getVotacioEnCurs() {
      return this.votacioEnCurs
    },
    getPuntuacio() {
      return this.puntuacio
    },
    getOuts() {
      return this.outs
    },
    getEquipAtacant() {
      return this.equipAtacant
    },
    getRespostes1() {
      return this.respostes1
    },
    getRespostes2() {
      return this.respostes2
    },

    //grafics
    getTotalVotacions() {
      return this.totalVotacions
    },
    getTotalJugadors() {
      return this.totalJugadors
    },

    //setters
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setTeam(team) {
      this.team = team
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
    setPuntuacio(puntuacio) {
      this.puntuacio = puntuacio
    },
    setOuts(outs) {
      this.outs = outs
    },
    setEquipAtacant(equipAtacant) {
      this.equipAtacant = equipAtacant
    },
    setRespostes1(respostes1) {
      this.respostes1 = respostes1
    },
    setRespostes2(respostes2) {
      this.respostes2 = respostes2
    },

    //grafics
    setTotalVotacions(totalVotacions) {
      this.totalVotacions = totalVotacions
    },
    setTotalJugadors(totalJugadors) {
      this.totalJugadors = totalJugadors
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
