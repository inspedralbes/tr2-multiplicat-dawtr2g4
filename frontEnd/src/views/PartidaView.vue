<template>
    <div class="partida">
        <div class="informacio-rols-equips">
            <div v-if="equip == salaInfo.equipAtacant">
                <div :class="['informacio-rols-esquerra', equip == 1 ? 'informacio-rols--equip1' : 'informacio-rols--equip2']">
                    <h1 class="equip-batejador">EQUIP {{ equip }} ET TOCA BATEJAR</h1>
                </div>
                <div :class="['informacio-rols-dreta', equip != 1 ? 'informacio-rols--equip1' : 'informacio-rols--equip2']">
                    <h1 class="equip-batejador">L'EQUIP CONTRARI DEFENSA</h1>
                </div>
            </div>
            <div v-else-if="equip != salaInfo.equipAtacant && !profe">
                <div :class="['informacio-rols-esquerra', equip == 1 ? 'informacio-rols--equip1' : 'informacio-rols--equip2']">
                    <h1 class="equip-batejador">EQUIP {{ equip }} ET TOCA DEFENSAR</h1>
                </div>
                <div :class="['informacio-rols-dreta', equip != 1 ? 'informacio-rols--equip1' : 'informacio-rols--equip2']">
                    <h1 class="equip-batejador">L'EQUIP CONTRARI BATEJA</h1>
                </div>
            </div>
            <div v-else>
                <div :class="['informacio-rols-esquerra', salaInfo.equipAtacant == 1 ? 'informacio-rols--equip1' : 'informacio-rols--equip2']">
                    <h1 class="equip-batejador">EQUIP {{ salaInfo.equipAtacant }} ET TOCA BATEJAR</h1>
                </div>
                <div :class="['informacio-rols-dreta', equipDefensor == 1 ? 'informacio-rols--equip1' : 'informacio-rols--equip2']">
                    <h1 class="equip-batejador">EQUIP {{ equipDefensor }} ET TOCA DEFENSAR</h1>
                </div>
            </div>
        </div>
        <div id="grid-container">
            <div id="camp-de-joc">
                <img v-for="jugador in salaInfo.jugadorsCamp"
                    :class="[jugador.baseActual == 0 ? 'home-base' : jugador.baseActual == 1 ? 'primera-base' : jugador.baseActual == 2 ? 'segona-base' : jugador.baseActual == 3 ? 'tercera-base' : 'home-base', 'jugador']"
                    :src="'/img/jugador-' + jugador.id + '-eq-' + salaInfo.equipAtacant +'.png'" alt="jugador">
                <img class="camp" src="/img/camp.png" alt="">
            </div>
            <div id="banqueta">
                <img class=jugador v-for="jugador in salaInfo.jugadorsBanqueta" :src="'/img/jugador-' + jugador.id + '-eq-' + salaInfo.equipAtacant +'.png'"
                    alt="">
            </div>
            <div id="contenidor-marcador-puntuacio">
                <div class="marcador">
                    <div class="contenidor-equip">
                        <h2>EQUIP 1</h2>
                        <div class="contenidor-punts">
                            <p class="punts">{{ puntuacioEquip1 }}</p>
                        </div>
                    </div>
                    <div class="contenidor-equip">
                        <h2>EQUIP 2</h2>
                        <div class="contenidor-punts">
                            <p class="punts"> {{ puntuacioEquip2 }}</p>
                        </div>
                    </div>
                    <div class="linia"></div>
                    <div class="contenidor-outs">
                        <h2 class="outs-titol">OUTS</h2>
                        <div class="contenidor-llums">
                            <div v-for="actual in salaInfo.outs" class="llum-item llum-item--encesa"></div>
                            <div v-for="actual in (3 - salaInfo.outs)" class="llum-item"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="moviment-bases">
                <div v-if="votacioBaseEnCurs == false && profe" @click="initVotacio" class="flex justify-content-center h-auto">
                    <button class="votar_button">COMENÇAR VOTACIÓ DIFICULTAT</button>
                </div>
                <div v-if="votacioBaseEnCurs == true" class="temporitzador-container w-max mt-4"><img
                        src="/img/pilota-beisbol-cronometre.png" width="70" height="70" alt="">
                    <p class="temporitzador text-align text-2xl font-semibold">{{ temporitzador }}</p>
                </div>
                <div class="contenidor-dificultat-bases" v-if="votacioBaseEnCurs == true && (equip == salaInfo.equipAtacant || profe)">
                    <p>Quantes bases us voleu moure?</p>
                    <div>
                        <button
                            v-if="!profe" :class="[dificultatSeleccionada.isSelected_1 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']"
                            v-on:click="baseSeleccionada(1)"
                            class="sel">
                            <p>{{ 1 }}</p>
                            <div v-if="!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3" class="contenidor-moure-imatge-pilota">
                                <div class="contenidor-rotar-imatge-pilota">
                                    <img src="../components/icons/pilota-boto-fons.png" width="25" height="25" alt="">
                                </div>
                            </div>
                        </button>
                        <button
                            v-else :class="[dificultatSeleccionada.isSelected_1 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']">
                            <p>{{ 1 }}</p>
                            <div v-if="!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3" class="contenidor-moure-imatge-pilota">
                                <div class="contenidor-rotar-imatge-pilota">
                                    <img src="../components/icons/pilota-boto-fons.png" width="25" height="25" alt="">
                                </div>
                            </div>
                        </button>
                        <button
                            v-if="!profe" :class="[dificultatSeleccionada.isSelected_2 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']"
                            v-on:click="baseSeleccionada(2)"
                            class="sel">
                            <p>{{ 2 }}</p>
                            <div v-if="!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3" class="contenidor-moure-imatge-pilota">
                                <div class="contenidor-rotar-imatge-pilota">
                                    <img src="../components/icons/pilota-boto-fons.png" width="25" height="25" alt="">
                                </div>
                            </div>
                        </button>
                        <button
                            v-else :class="[dificultatSeleccionada.isSelected_2 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']">
                            <p>{{ 2 }}</p>
                            <div v-if="!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3" class="contenidor-moure-imatge-pilota">
                                <div class="contenidor-rotar-imatge-pilota">
                                    <img src="../components/icons/pilota-boto-fons.png" width="25" height="25" alt="">
                                </div>
                            </div>
                        </button>
                        <button
                            v-if="!profe" :class="[dificultatSeleccionada.isSelected_3 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']"
                            v-on:click="baseSeleccionada(3)"
                            class="sel">
                            <p>{{ 3 }}</p>
                            <div v-if="!this.dificultatSeleccionada.isSelected_1 && !this.dificultatSeleccionada.isSelected_2 && !this.dificultatSeleccionada.isSelected_3" class="contenidor-moure-imatge-pilota">
                                <div class="contenidor-rotar-imatge-pilota">
                                    <img src="../components/icons/pilota-boto-fons.png" width="25" height="25" alt="">
                                </div>
                            </div>
                        </button>
                        <button
                            v-else :class="[dificultatSeleccionada.isSelected_3 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']">
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
        },
        puntuacioEquip1() {
            let number = this.pinia.getSalaInfo().equips[0].punts;
            return number.toString().padStart(2, '0');
        },
        puntuacioEquip2() {
            let number = this.pinia.getSalaInfo().equips[1].punts;
            return number.toString().padStart(2, '0');
        },
        equipDefensor() {
            let atacant = this.pinia.getSalaInfo().equipAtacant;
            let defensor = 0;
            if (atacant == 1) {
                defensor = 2;
            } else {
                defensor = 1;
            }
            return defensor;
        }
    },
    mounted() {
    }
}

</script>

<style lang="scss" scoped>

.sel {
    cursor: pointer;
}

:root {
    --timeMov: 0.75s;
    --equip1: #ff4d4d;
    --equip2: #4da6ff;
    --text-fons-fosc: #fff;
}

@font-face {
    font-family: 'Digital Display';
    src: url('https://praxeds.github.io/scrimba-basketball-scoreboard/Assets/Digital-Display.woff2') format('woff2'),
        url('https://praxeds.github.io/basketball-scoreboard/Assets/Digital-Display.woff2') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

/* ESTILS GENERALS */

.partida {
    background-image: url('/img/landing.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

#grid-container {
    clear: both;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        "puntuacio camp-de-joc moviment-bases"
        "banqueta camp-de-joc moviment-bases";
    gap: 20px 20px;
    margin-top: 100px;
    height: 535px;
}

/* ESTILS INFORMACIÓ ROLS EQUIP */

.informacio-rols-esquerra {
  width: 90%;
  height: 60px;
  position: relative;
  margin-top: 20px;
}

.informacio-rols-esquerra:before {
  content: "";
  position: absolute;
  right: -30px;
  bottom: 0;
  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
}

.informacio-rols-dreta {
  width: 90%;
  height: 60px;
  position: relative;
  margin-top: 5px;
  float: right;
}

.informacio-rols-dreta:before {
  content: "";
  position: absolute;
  left: -30px;
  bottom: 0;
  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  transform: rotate(180deg);
}

.informacio-rols--equip1 {
  background: #ff4d4d;
}

.informacio-rols--equip2 {
  background: #4da6ff;
}

.informacio-rols--equip1:before {
  content: "";
  border-left: 30px solid #ff4d4d;
}

.informacio-rols--equip2:before {
  content: "";
  border-left: 30px solid #4da6ff;
}

.equip-batejador{
    margin: 0;
    padding: 12px;
    text-align: center;
    color: white;
}

/*ESTILS MARCADOR PUNTUACIÓ*/

#contenidor-marcador-puntuacio {
    grid-area: puntuacio;
    padding: 3px;
    justify-self: right;
    width: 80%;
}

.marcador {
    display: grid;
    justify-content: space-around;
    align-items: center;
    grid-template-areas:
    "eq1 eq2"
    "outs outs";
    position: relative;

    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: #1e4620;
    border: 7px solid white;
    outline: 10px solid #1e4620;
    margin-top: 5px;
}

.marcador:nth-child(1) {
    grid-area: eq1;
}

.marcador:nth-child(2) {
    grid-area: eq2;
}

.linia {
    position: absolute;
    height: 7px;
    width: 100%;
    bottom: 30%;
    background-color: white;
}

.contenidor-outs{
    grid-area: outs;
    display: flex;
    flex-direction: row;
    align-items: end;
}

.contenidor-llums {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;
    padding: 10px;
    width: fit-content;
    height: 30px;
    background-color: gray;
    margin: 20px 0px 10px 20px;
}

.llum-item {
  height: 20px;
  width: 20px;
  background-color: black;
  border-radius: 50%;
}

.llum-item--encesa {
    background-color: #fff;
    box-shadow: 0 0 5px #fff, 0 0 10px red, 0 0 15px red, 0 0 20px red, 0 0 35px red, 0 0 40px red;
}

.contenidor-equip {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.contenidor-equip h2 {
    font-size: 1.25em;
    margin-top: 20px;
    margin-bottom: 10px;
    color: white;
}

.outs-titol {
    font-size: 1.5em;
    margin-top: 20px;
    margin-bottom: 10px;
    color: white;
}

.contenidor-punts {
    position: relative;
    width: 100%;
    height: 4em;

    margin-bottom: 20px;
    background-color: #0c0c0c ;
}

.punts {
    font-family: 'Digital Display', monospace;
    font-size: 4em;
    text-align: center;

    position: absolute;
    z-index: 1;
    top: 50%;
    left: 52.5%;
    transform: translate(-50%, -50%);

    margin: 0;
    color: rgb(255, 217, 0);
}

/*ESTILS ESCOLLIR BASE DIFICULTAT*/

#moviment-bases {
    grid-area: moviment-bases;
    // border: 1px solid black;
    padding: 10px 20px;
    justify-self: left;
    margin-right: 50px;
    width: 80%;
    height: 100%;
    background-color: white;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 10px 8px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 15px;
}

.votar_button {
    border: 1px solid black;
    background-color: white;
    font-size: 1rem;
    color: #000000;
    padding: 10px 20px;
    cursor: pointer;
    margin: auto;
    border-radius: 15px;
}
.votar_button:hover {
    background-color: #000000;
    color: #ffffff;
}

.temporitzador-container {
    margin: 0 auto;
    position: relative;
}

.temporitzador-container > img {
    animation: rotacioInfinita 8s linear infinite;
}

.temporitzador {
    position: absolute;
    top: 0;
    left: 31%;
}

.contenidor-dificultat-bases > p {
    margin-top: 50px;
 text-align: center;
 font-size: 1.5em;
 font-weight: bolder;
}

.base-item {
    width: 100%;
    height: 50px;
    border: none;
    padding: 30px 30px;
    text-align: center;
    line-height: 0;
    font-weight: bolder;
    margin-bottom: 15px;
    display: flex;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 10px 8px 8px 0 rgba(0, 0, 0, 0.5);
}

.base-item > p {
    font-size: 1.5em;
    color:black;
    animation: mostrarNumeroBase 4s infinite linear;
}

.contenidor-moure-imatge-pilota {
    position: absolute;
    left: 0px;
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

.contenidor-rotar-imatge-pilota {
    animation: rotacioInfinita 2s infinite linear;
}

.contenidor-rotar-imatge-pilota > img {
    animation: mostrarPilota 4s infinite linear;
}

.base-item--selected {
    background-color: #555555;
    color: #f1f1f1;
}

.base-item--not-selected {
    background-color: white;
    color: #555555;
}

/*ESTILS CAMP DE JOC */
#camp-de-joc {
    grid-area: camp-de-joc;
    position: relative;
    width: 100%;
    height: 535px;
    // border: 1px solid black;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    border-radius: 15px;
}

.camp {
    width: 100%;
    height: 100%;
    padding: 2.5%;
    position: absolute;
    object-fit: contain;
    box-shadow: 10px 8px 8px 0 rgba(0, 0, 0, 0.5);

}

/* ESTILS AVATAR JUGADOR */
.jugador {
    width: 80px;
    height: 80px;
    z-index: 1;
    // transition: all 1.5s ease;
    border-radius: 50%;
}

/* ESTILS BANQUETA */

#banqueta {
    grid-area: banqueta;
    background-image: url("/img/banqueta.PNG");
    background-size: 70% 70%;
    background-repeat: no-repeat;
    background-position: center;
    justify-self: right;
    width: 80%;
    height: 80%;
    align-self: flex-end;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0px 20px;
    border-radius: 15px;
    box-shadow: 10px 8px 8px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    gap: 10px 10px;
}

#puntuacio {
    grid-area: puntuacio;
    padding: 5px;
    justify-self: right;
    //margin-right: 50px;
    width: 80%;
}

.contenidor-dificultat-bases > p {
    margin-top: 50px;
    text-align: center;
    font-size: 1.5em;
    font-weight: bolder;
}

/* ESTILS POSICIONS JUGADORS EN EL CAMP */
.home-base {
    position: absolute;
    bottom: 1%;
    left: 46.75%;
}

.primera-base {
    position: absolute;
    bottom: 45%;
    left: 69%;
}

.segona-base {
    position: absolute;
    bottom: 83%;
    left: 46.75%;
}

.tercera-base {
    position: absolute;
    bottom: 45%;
    left: 25%;
}

/* ANIMACIONS DIFICULTAT VOTACIONS*/

@keyframes rotacioInfinita {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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
</style>