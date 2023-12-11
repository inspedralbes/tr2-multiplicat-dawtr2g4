<template>
    <div>
        <div>
            <h1>Ara mateix batejant EQUIP {{ salaInfo.equipAtacant }}</h1>
        </div>
        <div id="grid-container">
            <div id="camp-de-joc">
                <img class="jugador home-base" id="jugador-0" src="/img/jugador.png" alt="jugador">
                <img class="camp" src="/img/camp.jpg" alt="">
            </div>
            <div id="puntuacio">
                <p>EQUIP 1: {{ salaInfo.equips[0].punts }}</p>
                <p>EQUIP 2: {{ salaInfo.equips[1].punts }}</p>
            </div>
            <div id="moviment-bases">
                <button v-if="votacioBaseEnCurs == false" @click="initVotacio">COMENÇAR VOTACIÓ</button>
                <div v-if="votacioBaseEnCurs == true" class="temporitzador-container w-max mt-6"><img src="/img/pilota-beisbol-cronometre.png" width="70"
                        height="70" alt="">
                    <p class="temporitzador text-align text-2xl font-semibold">{{ temporitzador }}</p>
                </div>
                <div v-if="votacioBaseEnCurs == true && equip == salaInfo.equipAtacant">
                    <p>Quantes bases us voleu moure?</p>
                    <div class="contenidor-dificultat-bases">
                        <button :class="[dificultatSeleccionada.isSelected_1 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']" v-on:click="baseSeleccionada(1)">{{ 1 }}</button>
                        <button :class="[dificultatSeleccionada.isSelected_2 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']" v-on:click="baseSeleccionada(2)">{{ 2 }}</button>
                        <button :class="[dificultatSeleccionada.isSelected_3 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']" v-on:click="baseSeleccionada(3)">{{ 3 }}</button>
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
            //player: { id: 0, equip: null, base: 0 },
            indexSala: 0, // indexSala hardcodeado
        }
    },
    methods: {
        baseSeleccionada(idBase) {
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
        },
        pintarCamp() {
            const jugador = document.getElementById('jugador-0');
            if (this.jugadorEnCamp.baseActual == 0) {
                jugador.classList.add("home-base");
            } else if (this.jugadorEnCamp.baseActual == 1) {
                jugador.classList.remove("home-base");
                jugador.classList.add("primera-base");
            }
            else if (this.jugadorEnCamp.baseActual == 2) {
                jugador.classList.remove("home-base");
                jugador.classList.remove("primera-base");
                jugador.classList.add("segona-base");
            } else if (this.jugadorEnCamp.baseActual == 3) {
                jugador.classList.remove("home-base");
                jugador.classList.remove("primera-base");
                jugador.classList.remove("segona-base");
                jugador.classList.add("tercera-base");
            } else if (this.jugadorEnCamp.baseActual > 3) {
                jugador.classList.remove("primera-base");
                jugador.classList.remove("segona-base");
                jugador.classList.remove("tercera-base");
                jugador.classList.add("home-base");
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
        }
    },
    mounted() {
        //this.player.equip = this.pinia.getTeam();

        this.pinia.$subscribe((mutation, state) => {

            if (this.pinia.jugadorEnCamp.baseActual != 0) {
                this.pintarCamp();
            }
        });
    }
}

</script>

<style lang="scss" scoped>
:root {
    --timeMov: 0.75s;
}

#grid-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
        "camp-de-joc puntuacio"
        "camp-de-joc moviment-bases";
    margin-top: 20px;
    gap: 20px 20px;
}

#camp-de-joc {
    grid-area: camp-de-joc;
    position: relative;
    width: 612px;
    height: 535px;
    border: 1px solid black;
    justify-self: right;
}

.camp {
    width: 612px;
    height: 535px;
    position: absolute;
    object-fit: cover;
    z-index: -1;
}

.jugador {
    width: 60px;
    height: 60px;
}

#puntuacio {
    grid-area: puntuacio;
    border: 1px solid black;
    padding: 5px;
    justify-self: left;
    margin-right: 50px;
    width: 40%;
}

#moviment-bases {
    grid-area: moviment-bases;
    border: 1px solid black;
    padding: 5px;
    justify-self: left;
    margin-right: 50px;
    width: 40%;
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

.temporitzador-container > img {
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
}
.base-item--not-selected {
    background-color: #555555;
    color: #e7e7e7;
}

.base-item--selected {
    background-color: #e7e7e7;
    color:  #555555;
}

</style>