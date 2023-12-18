import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({

    //ruta
    url: '',

    //local
    user: {
      id: null,
      name: null,
      email: null,
      esAdmin: false,
      token: null
    },
    team: '',
    dificultatSeleccionada: {
      isSelected_1: false,
      isSelected_2: false,
      isSelected_3: false,
    },
    isPreguntaResposta: [],
    sales: [],
    indexSala: null,

    temporitzador: '', // utilitzat a Partida View
    torn: '',
    votacioBaseEnCurs: false, // utilitzat a Partida View
    votacioPreguntaEnCurs: false,
    tornarTaulell: false,
    base: '',
    jugadorEnCamp: {
      baseActual: 0,
      eliminat: false,
      equip: 0,
      id: ''
    },
    //Resultats Finals marcador
    resultatsFinals: [],

    //Vista usuari si resposta correcta o incorrecta
    respostaSeleccionada: [],
    respostaCorrecta: [],
  }),
  actions: {

    //getters
    getSales() {
      return this.sales
    },
    getTeam() {
      return this.team
    },
    getSalaInfo() {
      console.log("sala info", this.sales[this.indexSala])
      return this.sales[this.indexSala]
    },
    getLlistaJugadors() {
      console.log(this.getSalaInfo)
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
      // return this.totalVotacions
      console.log(this.sales[this.indexSala].totalVots)
      return this.sales[this.indexSala].totalVots;
    },
    getTotalJugadors() {
      // return this.totalJugadors;
      return this.sales[this.indexSala].jugadors.length;
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
    getUser() {
      return this.user
    },
    getToken() {
      return this.user.token
    },
    getUserName() {
      return this.user.name
    },
    getProfe() {
      return this.user.esAdmin
    },
    getUrl() {
      return this.url
    },

    //Vista usuari si resposta correcta o incorrecta
    getRespostaSeleccionada() {
      return this.respostaSeleccionada
    },
    getRespostaCorrecta() {
      return this.respostaCorrecta
    },

    //setters
    setTeam(team) {
      this.team = team
    },
    setSalaInfo(id, salaInfo) {
      id = id === null ? this.indexSala : id;
      this.sales[id] = salaInfo
    },
    addSala(sala) {
      this.sales.push(sala)
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
    setUser(user) {
      this.user = user
    },
    setUserName(name){
      this.user.name = name
    },
    //Vista usuari si resposta correcta o incorrecta
    setRespostaSeleccionada(respostaSeleccionada) {
      this.respostaSeleccionada = respostaSeleccionada
    },
    setRespostaCorrecta(respostaCorrecta) {
      this.respostaCorrecta = respostaCorrecta
    },

    //logout
    logout() {
      this.user = {
        id: null,
        name: null,
        email: null,
        token: null,
        esAdmin: false
      }
      localStorage.removeItem('user');
    },
  },
})
