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
    dificultatSeleccionada: {
      isSelected_1: false,
      isSelected_2: false,
      isSelected_3: false,
    },
    isPreguntaResposta: [],
    //socket: io('http://localhost:3000'),
    sales: [],
    indexSala: null,


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
    profe: false,
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
      console.log("sala info", this.sales[this.indexSala])
      return this.sales[this.indexSala]
    },
    getLlistaJugadors() {
      return this.getSalaInfo().jugadors
    },
    getPreguntaActual() {
      return this.sales[this.indexSala].preguntaActual
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
      return this.sales[this.indexSala].equipAtacant
    },
    getJugadorEnCamp() {
      return this.jugadorEnCamp
    },
    getTotalVots() {
      return this.sales[this.indexSala].totalVots
    },
    getResultatsActuals() {
      return this.sales[this.indexSala].resultatsActuals
    },
    getRondes() {
      return this.sales[this.indexSala].rondes
    },
    getIndexSala() {
      return this.indexSala;
    },

    //grafics
    getTotalVotacions() {
      return this.totalVotacions
    },
    getTotalJugadors() {
      return this.totalJugadors
    },
    getDificultatSeleccionada() {
      return this.dificultatSeleccionada
    },
    getIsPreguntaResposta() {
      return this.isPreguntaResposta
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
    getProfe() {
      return this.profe
    },

    //setters
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setTeam(team) {
      this.team = team
    },
    setSalaInfo(id, salaInfo) {
      id = id === null ? this.indexSala : id;
      this.sales[id] = salaInfo
    },
    setPreguntaActual(preguntaActual) {
      this.sales[this.indexSala].preguntaActual = preguntaActual
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
      this.sales[this.indexSala].equipAtacant = equipAtacant
    },
    setJugadorEnCamp(jugadorEnCamp) {
      this.jugadorEnCamp = jugadorEnCamp
    },
    setTotalVots(totalVots) {
      this.sales[this.indexSala].totalVots = totalVots
    },
    setResultatsActuals(resultatsActuals) {
      this.sales[this.indexSala].resultatsActuals = resultatsActuals
    },
    setRondes(rondes) {
      this.sales[this.indexSala].rondes = rondes
    },
    setIndexSala(index) {
      this.indexSala = index
    },

    //grafics
    setTotalVotacions(totalVotacions) {
      this.totalVotacions = totalVotacions
    },
    setTotalJugadors(totalJugadors) {
      this.totalJugadors = totalJugadors
    },
    setDificultatSeleccionada(dificultatSeleccionada) {
      this.dificultatSeleccionada = dificultatSeleccionada
    },
    setIsPreguntaResposta(isPreguntaResposta) {
      this.isPreguntaResposta = isPreguntaResposta
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
    setProfe(profe) {
      if (profe === 1) {
        profe = true
      } else {
        profe = false
      }
      this.profe = profe
    },


    //logout

    logout() {
      this.token = ''
      this.user = {}
    },

  },
})
