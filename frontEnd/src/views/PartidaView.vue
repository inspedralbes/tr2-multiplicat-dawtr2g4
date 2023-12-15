<template>
    <div class="partida">
        <div>
            <h1>Ara mateix batejant EQUIP {{ salaInfo.equipAtacant }}</h1>
        </div>
        <div id="grid-container">
            <div id="camp-de-joc">
                <img v-for="jugador in salaInfo.jugadorsCamp" :class="[jugador.baseActual == 0 ? 'home-base' : jugador.baseActual == 1 ? 'primera-base' : jugador.baseActual == 2 ? 'segona-base' : jugador.baseActual == 3 ? 'tercera-base' : 'home-base', 'jugador']" :src="'/img/jugador-' + jugador.id + '.png'" alt="jugador">
                <img class="camp" src="/img/camp.jpg" alt="">
            </div>
            <div id="banqueta">
                <img class = jugador v-for="jugador in salaInfo.jugadorsBanqueta" :src="'/img/jugador-' + jugador.id + '.png'" alt="">
            </div>
            <div id="puntuacio">
                <p>OUTS: {{ salaInfo.outs }}</p>
                <p>EQUIP 1: {{ salaInfo.equips[0].punts }}</p>
                <p>EQUIP 2: {{ salaInfo.equips[1].punts }}</p>
            </div>
            <div id="moviment-bases">
                <button v-if="votacioBaseEnCurs == false && profe" @click="initVotacio">COMENÇAR VOTACIÓ</button>
                <div v-if="votacioBaseEnCurs == true" class="temporitzador-container w-max mt-4"><img src="/img/pilota-beisbol-cronometre.png" width="70"
                        height="70" alt="">
                    <p class="temporitzador text-align text-2xl font-semibold">{{ temporitzador }}</p>
                </div>
                <div v-if="votacioBaseEnCurs == true && equip == salaInfo.equipAtacant">
                    <p>Quantes bases us voleu moure?</p>
                    <div class="contenidor-dificultat-bases">
                        <button :class="[dificultatSeleccionada.isSelected_1 ? 'base-item--selected' : 'base-item--not-selected', 'base-item']" v-on:click="baseSeleccionada(1)">
                            {{ 1 }}
                            <img src="../components/icons/pilota-boto-fons.png" width="20" height="20" alt="">
                        </button>
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

.partida{
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
    margin-top: 20px;
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
    padding: 5px;
    justify-self: left;
    margin-right: 50px;
    width: 80%;
    background-color: #4caf50;
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
.base-item--selected {
    background-color: #555555;
    color: #f1f1f1;
}

.base-item--not-selected {
    background-color: #f1f1f1;
    color:  #555555;
}

</style>