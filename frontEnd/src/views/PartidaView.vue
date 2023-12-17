<template>
    <div class="partida">
        <div>
            <h1>Ara mateix batejant EQUIP {{ salaInfo.equipAtacant }}</h1>
        </div>
        <div id="grid-container">
            <div id="camp-de-joc">
                <img v-for="jugador in salaInfo.jugadorsCamp"
                    :class="[jugador.baseActual == 0 ? 'home-base' : jugador.baseActual == 1 ? 'primera-base' : jugador.baseActual == 2 ? 'segona-base' : jugador.baseActual == 3 ? 'tercera-base' : 'home-base', 'jugador']"
                    :src="'/img/jugador-' + jugador.id + '.png'" alt="jugador">
                <img class="camp" src="/img/camp.jpg" alt="">
            </div>
            <div id="banqueta">
                <img class=jugador v-for="jugador in salaInfo.jugadorsBanqueta" :src="'/img/jugador-' + jugador.id + '.png'"
                    alt="">
            </div>
            <div id="puntuacio">
                <div class="scoreboard">
                    <div class="team-container">
                        <h2>EQUIP 1</h2>
                        <div class="one">
                            <p class="pts" id="home-pts">0</p>
                            <p class="pts-shadow">00</p>
                        </div>
                    </div>
                    <div class="team-container">
                        <h2>EQUIP 2</h2>
                        <div class="one">
                            <p class="pts" id="home-pts">0</p>
                            <p class="pts-shadow">00</p>
                        </div>
                    </div>
                    <div class="linia"></div>
                    <div class="bola">
                        <h2>BOLA</h2>
                        <div class="contenidor-bola">
                            <div class="bola-item"></div>
                            <div class="bola-item"></div>
                            <div class="bola-item"></div>
                        </div>
                    </div>
                </div>
                <!--<p>OUTS: {{ salaInfo.outs }}</p>
                <p>EQUIP 1: {{ salaInfo.equips[0].punts }}</p>
                <p>EQUIP 2: {{ salaInfo.equips[1].punts }}</p>-->
            </div>
            <div id="moviment-bases">
                <button v-if="votacioBaseEnCurs == false && profe" @click="initVotacio">COMENÇAR VOTACIÓ</button>
                <div v-if="votacioBaseEnCurs == true" class="temporitzador-container w-max mt-4"><img
                        src="/img/pilota-beisbol-cronometre.png" width="70" height="70" alt="">
                    <p class="temporitzador text-align text-2xl font-semibold">{{ temporitzador }}</p>
                </div>
                <div class="contenidor-dificultat-bases" v-if="votacioBaseEnCurs == true && equip == salaInfo.equipAtacant">
                    <p>Quantes bases us voleu moure?</p>
                    <div>
                        <button
                            :class="[dificultatSeleccionada.isSelected_1 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']"
                            v-on:click="baseSeleccionada(1)">
                            <p>{{ 1 }}</p>
                            <div v-if="!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3" class="contenidor-moure-imatge-pilota">
                                <div class="contenidor-rotar-imatge-pilota">
                                    <img src="../components/icons/pilota-boto-fons.png" width="25" height="25" alt="">
                                </div>
                            </div>
                        </button>
                        <button
                            :class="[dificultatSeleccionada.isSelected_2 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']"
                            v-on:click="baseSeleccionada(2)">
                            <p>{{ 2 }}</p>
                            <div v-if="!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3" class="contenidor-moure-imatge-pilota">
                                <div class="contenidor-rotar-imatge-pilota">
                                    <img src="../components/icons/pilota-boto-fons.png" width="25" height="25" alt="">
                                </div>
                            </div>
                        </button>
                        <button
                            :class="[dificultatSeleccionada.isSelected_3 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']"
                            v-on:click="baseSeleccionada(3)">
                            <p>{{ 3 }}</p>
                            <div v-if="!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3" class="contenidor-moure-imatge-pilota">
                                <div class="contenidor-rotar-imatge-pilota">
                                    <img src="../components/icons/pilota-boto-fons.png" width="25" height="25" alt="">
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import io from 'socket.io-client';

import { useAppStore } from '../stores/app'
import { socket } from '@/socket';
import { watch } from 'vue'
export default {
    data() {
        return {

        }
    },
    methods: {
        baseSeleccionada(idBase) {
            if (!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3) {
                if (idBase == 1 | idBase == 2 | idBase == 3) {
                    if (idBase == 1) {
                        this.dificultatSeleccionada.isSelected_1 = true;
                    } else if (idBase == 2) {
                        this.dificultatSeleccionada.isSelected_2 = true;
                    } else if (idBase == 3) {
                        this.dificultatSeleccionada.isSelected_3 = true;
                    }
                    socket.emit('vot-dificultat', this.indexSala, idBase);
                }
            }
        },
        initVotacio() {
            socket.emit('començar-votacio-dificultat', this.indexSala);
        }
    },
    setup() {
        const pinia = useAppStore();
        return { pinia };
    },
    computed: {
        equip() {
            return this.pinia.getTeam();
        },
        temporitzador() {
            let temporitzador = this.pinia.getTemporitzador();
            return temporitzador.toString().padStart(2, '0');
        },
        votacioBaseEnCurs() {
            return this.pinia.getVotacioBaseEnCurs();
        },
        jugadorEnCamp() {
            return this.pinia.getJugadorEnCamp();
        },
        salaInfo() {
            return this.pinia.getSalaInfo();
        },
        dificultatSeleccionada() {
            return this.pinia.getDificultatSeleccionada();
        },
        indexSala() {
            return this.pinia.getIndexSala();
        },
        profe() {
            return this.pinia.getProfe();
        }
    },
    mounted() {
    }
}

</script>

<style lang="scss" scoped>

:root {
    --timeMov: 0.75s;
}

@font-face {
    font-family: 'Digital Display';
    src: url('https://praxeds.github.io/scrimba-basketball-scoreboard/Assets/Digital-Display.woff2') format('woff2'),
        url('https://praxeds.github.io/basketball-scoreboard/Assets/Digital-Display.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

/*ESTILS MARCADOR PUNTUACIÓ*/
.scoreboard {
    /*display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;*/

    display: grid;
    justify-content: space-around;
    align-items: center;
    grid-template-areas:
    "eq1 eq2"
    "bola bola";
    position: relative;

    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color:  rgb(6, 42, 139);
    border: 7px solid white;
    outline: 10px solid  rgb(6, 42, 139);
}

.scoreboard:nth-child(1) {
    grid-area: eq1;
}

.scoreboard:nth-child(2) {
    grid-area: eq2;
}

.linia {
    position: absolute;
    height: 7px;
    width: 100%;
    bottom: 25%;
    background-color: white;
}

.bola{
    grid-area: bola;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.contenidor-bola {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    padding: 10px;
    width: fit-content;
    height: 30px;
    background-color: gray;
    margin: 20px 0px 10px 10px;
}

.bola-item {
  height: 20px;
  width: 20px;
  background-color: #bbb;
  border-radius: 50%;
}

.team-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    font-size: 1.25em;
    margin-top: 20px;
    margin-bottom: 10px;
}

.one {
    position: relative;
    width: 100%;
    height: 4em;

    margin-bottom: 20px;
    background-color: #0c0c0c ;
}

.pts-shadow {
    font-family: 'Digital Display',monospace;
    font-size: 4em;
    text-align: center;

    position: absolute;
    z-index: 1;
    top: 50%;
    left: 52.5%;
    transform: translate(-50%, -50%);

    margin: 0;
    color: gray;
}

.pts {
    font-family: 'Digital Display',monospace;
    font-size: 4em;
    text-align: end;

    position: relative;
    z-index: 2;
    top: 50%;
    left: 52.5%;
    transform: translate(-50%, -50%);

    margin: 0;
    margin-right: 32px;
    color: rgb(255, 217, 0);
}

/**/

.partida {
    background-image: url('/img/landing.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

#grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 2fr;
    grid-template-areas:
        ". camp-de-joc puntuacio"
        "banqueta camp-de-joc moviment-bases";
    margin-top: 50px;
    gap: 20px 20px;
}

#camp-de-joc {
    grid-area: camp-de-joc;
    position: relative;
    width: 100%;
    height: 535px;
    border: 1px solid black;
    background-color: white;
    display: flex;
    justify-content: center;
}

.camp {
    width: 612px;
    height: 533px;
    position: absolute;
    object-fit: cover;
}

.jugador {
    width: 60px;
    height: 60px;
    z-index: 1;
}

#banqueta {
    grid-area: banqueta;
    border: 1px solid black;
    background-image: url("/img/banqueta.PNG");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    justify-self: right;
    width: 80%;
    height: 50%;
    align-self: flex-end;
}

#puntuacio {
    grid-area: puntuacio;
    border: 1px solid black;
    padding: 5px;
    justify-self: left;
    //margin-right: 50px;
    width: 80%;
    background-color: white;
}

#moviment-bases {
    grid-area: moviment-bases;
    border: 1px solid black;
    padding: 10px 20px;
    justify-self: left;
    margin-right: 50px;
    width: 80%;
    background-color: white;
}

.contenidor-dificultat-bases > p {
 text-align: center;
}
.moviment {
    transition: all var(--timeMov) ease;
    /* Puedes ajustar la duración y la función de temporización según tus necesidades */
}

.home-base {
    position: absolute;
    bottom: 8%;
    left: 45%;
}

.primera-base {
    position: absolute;
    bottom: 34%;
    left: 64%;
}

.segona-base {
    position: absolute;
    bottom: 55%;
    left: 45%;
}

.tercera-base {
    position: absolute;
    bottom: 34%;
    left: 26%;
}

.temporitzador {
    position: absolute;
    top: 0;
    left: 31%;
}

@keyframes rotacioInfinita {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.temporitzador-container {
    margin: 0 auto;
    position: relative;
}

.temporitzador-container>img {
    animation: rotacioInfinita 8s linear infinite;
}

.base-item {
    width: 100%;
    height: 30px;
    border: none;
    padding: 20px 30px;
    text-align: center;
    line-height: 0;
    font-weight: bolder;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.base-item > p {
    animation: mostrarNumeroBase 4s infinite linear;
}

@keyframes mostrarNumeroBase {
    0% {
        opacity: 1;
    }

    25% {
        opacity: 0;
    }

    50% {
        opacity: 0;
    }

    75% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.base-item:nth-child(1) .contenidor-moure-imatge-pilota {
    animation: mourePilotaFacil 4s infinite linear;
}
.base-item:nth-child(2) .contenidor-moure-imatge-pilota {
    animation: mourePilotaNormal 4s infinite linear;
}
.base-item:nth-child(3) .contenidor-moure-imatge-pilota {
    animation: mourePilotaDificil 4s infinite linear;
}
.contenidor-moure-imatge-pilota {
    position: absolute;
    left: 0px;
}

@keyframes mourePilotaFacil {
    0% {
        left: 3%;
    }

    20% {
        left: 3%;
    }

    80% {
        left: 90%;
    }

    100% {
        left: 90%;
    }
}

@keyframes mourePilotaNormal {
    0% {
        left: 3%;
    }

    20% {
        left: 3%;
    }

    50% {
        left: 90%;
    }

    100% {
        left: 90%;
    }
}

@keyframes mourePilotaDificil {
    0% {
        left: 3%;
    }

    20% {
        left: 3%;
    }

    35% {
        left: 90%;
    }

    100% {
        left: 90%;
    }
}

.contenidor-rotar-imatge-pilota {
    animation: rotacioInfinita 2s infinite linear;
}

.contenidor-rotar-imatge-pilota > img {
    animation: mostrarPilota 4s infinite linear;
}

@keyframes mostrarPilota {
    0% {
        opacity: 0;
    }

    25% {
        opacity: 1;
    }

    50% {
        opacity: 1;
    }

    75% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}


.base-item--selected {
    background-color: #555555;
    color: #f1f1f1;
}

.base-item--not-selected {
    background-color: #f1f1f1;
    color: #555555;
}</style>