<template>
    <div>
        <h1>Ara mateix batejant EQUIP {{ equipAtacant }}</h1>
    </div>
    <div id="flex-container">
        <div id="container">
            <img class="jugador home-base" id="jugador-0" src="/img/jugador.png" alt="jugador">
            <img class="camp" src="/img/camp.jpg" alt="">
        </div>
        <div id="moviment-bases">
            <!--<button @click="initVotacio" v-if="temporitzador === 3">COMENÇAR VOTACIÓ</button>--> 
            <button @click="initVotacio">COMENÇAR VOTACIÓ</button>
            <p>{{ temporitzador }}</p>
            <div v-if="votacioBaseEnCurs == true && equip == equipAtacant">
                <p>Quantes bases us voleu moure?</p>
                <div v-for="index in 3" :key="index">
                    <button v-on:click="baseSeleccionada(index)">{{ index }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import io from 'socket.io-client';

import {useAppStore} from '../stores/app'
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
                console.log("Has pulsado " + idBase);       
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
        initVotacio(){  
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
            return this.pinia.getTemporitzador();
        },
        votacioBaseEnCurs() {
            return this.pinia.getVotacioBaseEnCurs();
        },
        outs() {
            return this.pinia.getOuts();
        },
        equipAtacant() {
            return this.pinia.getEquipAtacant();
        },
        jugadorEnCamp() {
            return this.pinia.getJugadorEnCamp();
        }
    },
    mounted() {
        //this.player.equip = this.pinia.getTeam();

        this.pinia.$subscribe((mutation, state) => {
            if(this.pinia.votacioBaseEnCurs == false && this.pinia.jugadorEnCamp.baseActual == 0 && this.pinia.jugadorEnCamp.eliminat == false) {
                this.$router.push('/pregunta'); 
            }

            if(this.pinia.jugadorEnCamp.baseActual != 0) {
                console.log("adeu")
                this.pintarCamp();
            }

            if(this.pinia.outs === 1) {
                //Cambiem d'equip atacant
            }
        });
    }
}

</script>

<style lang="scss" scoped>
:root{
    --timeMov: 0.75s;
}
#flex-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    column-gap: 20px;
}

#container {
    position: relative;
    width: 612px;
    height: 535px;
    border: 1px solid black;
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

#moviment-bases {
    border: 1px solid black;
    padding: 5px;
    height: 10%;
}

.moviment {
  transition: all var(--timeMov) ease; /* Puedes ajustar la duración y la función de temporización según tus necesidades */
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
</style>