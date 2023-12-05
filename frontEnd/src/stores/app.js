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

    //socket: io('http://localhost:3000'),
    sales: [],
    salaInfo: {
      jugadors: [],
      equips: [
        { nJugadors: 0, punts: 0 },
        { nJugadors: 0, punts: 0 }
      ],
      rondes: [],
      totalVots: 0,
      equipAtacant: 0,
      categoria: 1,
      preguntaActual: null,
      resultatsActuals: null,
      nomSala: "Sala 1"
    },

    //100%
    temporitzador: '', // utilitzat a Partida View
    torn: '',
    votacioBaseEnCurs: false, // utilitzat a Partida View
    votacioPreguntaEnCurs: false,
    tornarTaulell: false,
    base: '',

    totalVotacions: 0,
    totalJugadors: 0,
    jugadorEnCamp: {
      baseActual: 0,
      eliminat: false,
      equip: 0,
      id: ''
    },
    //Resultats Finals marcador
    resultatsFinals: [],
    token: '',
    user: {},
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
    getLlistaJugadors() {
      return this.salaInfo.jugadors
    },
    getPreguntaActual() {
      return this.salaInfo.preguntaActual
    },
    getTemporitzador() {
      return this.temporitzador
    },
    getTorn() {
      return this.torn
    },
    getVotacioBaseEnCurs() {
      return this.votacioBaseEnCurs
    },
    getVotacioPreguntaEnCurs() {
      return this.votacioPreguntaEnCurs
    },
    getTornarTaulell() {
      return this.tornarTaulell
    },
    getEquipAtacant() {
      return this.salaInfo.equipAtacant
    },
    getJugadorEnCamp() {
      return this.jugadorEnCamp
    },
    getTotalVots() {
      return this.salaInfo.totalVots
    },
    getResultatsActuals() {
      return this.salaInfo.resultatsActuals
    },
    getRondes() {
      return this.salaInfo.rondes
    },

    //grafics
    getTotalVotacions() {
      return this.totalVotacions
    },
    getTotalJugadors() {
      return this.totalJugadors
    },

    //Resultats Finals marcador
    getResultatsFinals() {
      return this.resultatsFinals
    },

    //token i user
    getToken() {
      return this.token
    },
    getUser() {
      return this.user
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
    setPreguntaActual(preguntaActual) {
      this.salaInfo.preguntaActual = preguntaActual
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
    setVotacioBaseEnCurs(votacioBaseEnCurs) {
      this.votacioBaseEnCurs = votacioBaseEnCurs
    },
    setVotacioPreguntaEnCurs(votacioPreguntaEnCurs) {
      this.votacioPreguntaEnCurs = votacioPreguntaEnCurs
    },
    setTornarTaulell(tornarTaulell) {
      this.tornarTaulell = tornarTaulell
    },
    setBase(base) {
      this.base = base
    },
    setEquipAtacant(equipAtacant) {
      this.salaInfo.equipAtacant = equipAtacant
    },
    setJugadorEnCamp(jugadorEnCamp) {
      this.jugadorEnCamp = jugadorEnCamp
    },
    setTotalVots(totalVots) {
      this.salaInfo.totalVots = totalVots
    },
    setResultatsActuals(resultatsActuals) {
      this.salaInfo.resultatsActuals = resultatsActuals
    },
    setRondes(rondes) {
      this.salaInfo.rondes = rondes
    },

    //grafics
    setTotalVotacions(totalVotacions) {
      this.totalVotacions = totalVotacions
    },
    setTotalJugadors(totalJugadors) {
      this.totalJugadors = totalJugadors
    },

    //Resultats Finals marcador
    setResultatsFinals(resultatsFinals) {
      this.resultatsFinals = resultatsFinals
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


    //token i user
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    },

  },
})
