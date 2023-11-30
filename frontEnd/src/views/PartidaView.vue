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
            <!--<button @click="initVotacio" v-if="count === 3">COMENÇAR VOTACIÓ</button>--> 
            <button @click="initVotacio">COMENÇAR VOTACIÓ</button>
            <p>{{ count }}</p>
            <div v-if="isVotacioEnCurs == true && player.equip == equipAtacant">
                <p>Quantes bases us voleu moure?</p>
                <form id="form" action="" v-on:change="seleccionarBase()">
                    <input type="radio" id="base1" name="base" value="1" v-model="baseEscollida">
                    <label for="base1"> 1 </label><br>
                    <input type="radio" id="base2" name="base" value="2" v-model="baseEscollida">
                    <label for="base2"> 2 </label><br>
                    <input type="radio" id="base3" name="base" value="3" v-model="baseEscollida">
                    <label for="base3"> 3 </label><br><br>
                </form>
                <h2>El jugador es troba a la base: {{ player.base }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
//import io from 'socket.io-client';

import {useAppStore} from '../stores/app'
import { socket } from '@/socket';
export default {
    data() {
        return {
            //socket: null,
            store: null,
            equipAtacant: "",
            player: { id: 0, equip: null, base: 0 },
            baseEscollida: "",
            isVotacioEnCurs: false,
            count: "",
            indexSala: 0,
            pregunta: "Pregunta",
            puntuacio: {
                equip1: [],
                equip2: []
            },
            outs: 0
        }
    },
    methods: {
        seleccionarBase() {

            const bases = document.getElementsByName('base');
            const jugador = document.getElementById('jugador-0');
            
            if (this.baseEscollida != "") {
                //socket.emit('seleccionar base', {baseEscollida: this.baseEscollida, player: this.player});
                socket.emit('votacio-dificultat', this.indexSala, this.baseEscollida);
                console.log("Has pulsado " + this.baseEscollida);
            }

            this.isVotacioEnCurs = false;
        },
        pintarCamp() {
            const jugador = document.getElementById('jugador-0');
            if (this.player.base == 0) {
                jugador.classList.add("home-base");
            } else if (this.player.base == 1) {
                jugador.classList.remove("home-base");
                jugador.classList.add("primera-base");
            }
            else if (this.player.base == 2) {
                jugador.classList.remove("home-base");
                jugador.classList.remove("primera-base");
                jugador.classList.add("segona-base");
            } else if (this.player.base == 3) {
                jugador.classList.remove("home-base");
                jugador.classList.remove("primera-base");
                jugador.classList.remove("segona-base");
                jugador.classList.add("tercera-base");
            } else if (this.player.base > 3) {
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
    computed: {
        count() {
            const store = useAppStore();
            return store.getTemporitzador();
        },
        isVotacioEnCurs() {
            const store = useAppStore();
            return store.getVotacioEnCurs();
        },
        outs() {
            const store = useAppStore();
            return store.getOuts();
        },
        equipAtacant() {
            const store = useAppStore();
            return store.getEquipAtacant();
        }
    },
    mounted() {
        this.store = useAppStore();
        this.player.equip = this.store.getTeam();
        //const store = useAppStore();
        this.store.$subscribe((mutation, state) => {
            if(this.store.votacioEnCurs == false) {
                this.$router.push('/pregunta'); 
            }

            if(this.store.outs === 1) {
                //Cambiem d'equip atacant
            }
        });
    }
}

</script>

<style lang="scss" scoped>
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