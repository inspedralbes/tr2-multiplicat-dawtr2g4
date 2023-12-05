<template>
    <div>
        <h1 class="tit">Select Team</h1>
        <button @click="començarPartida()">COMENÇAR PARTIDA</button>
        <div class="cont">
            <div>
                <button class="button e1" @click="escollirEquip(1)">Equip 1</button>
                <ul class="llistaUl">
                    <div v-if="!llistaJugadors">
                    </div>
                    <li v-else v-for="(actual, index) in equip1" :key="index" class="llistaLi">
                        {{ actual.nom }}
                    </li>
                </ul>
            </div>
            <div>
                <button class="button e2" @click="escollirEquip(2)">Equip 2</button>
                <ul class="llistaUl">
                    <div v-if="!llistaJugadors">
                    </div>
                    <li v-else v-for="(actual, index) in equip2" :key="index" class="llistaLi">
                        {{ actual.nom }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
//import io from 'socket.io-client';
import { useAppStore } from '../stores/app'
import { socket } from '@/socket';

export default {
    data() {
        return {
            store: useAppStore(),
            indexSala: 0,
            isEquipEscollit: false,
        }
    },
    methods: {
        escollirEquip(idEquip) {
            console.log("Has ecollit equip " + idEquip);
            if (this.isEquipEscollit == false && (idEquip == 1 || idEquip == 2)) {
                this.isEquipEscollit = true;
                this.store.setTeam(idEquip);
                socket.emit('equip-seleccionat', this.indexSala, idEquip, this.store.user);
            }
        },
        començarPartida() {
            socket.emit('partida-iniciada', this.indexSala)
        },

    },
    // mounted() {
    //     this.store = useAppStore();
    // },
    computed: {

        llistaJugadors() {
            return this.store.getLlistaJugadors();
        },
        equip1() {
            return this.llistaJugadors.filter(jugador => jugador.equip === 1 && jugador.nom);
        },
        equip2() {
            return this.llistaJugadors.filter(jugador => jugador.equip === 2 && jugador.nom);
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.tit {
    margin-top: 50px;
    margin-bottom: 100px;
}

.cont {
    display: flex;
    justify-content: center;
    justify-content: space-evenly;
}

.button {
    height: 400px;
    width: 400px;
    border: 2px solid transparent;
    color: white;
    font-size: 18px;
    text-align: center;
    text-transform: uppercase;
    border-radius: 20%;
    cursor: pointer;
    transition: all 0.3s ease;
}

.e1 {
    background-color: #ff4d4d;
    /* Rojo */
}

.e2 {
    background-color: #4da6ff;
    /* Azul */
}

.button:hover {
    border-color: #ffffff;
    /* Blanco */
}

.llistaUl {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 20px;
}

.llistaLi {
    text-align: center;
    border-bottom: 1px solid black;
    padding-bottom: 2px;
    margin-bottom: 10px;
    background-color: rgba(50, 50, 50, 0.7);
}

.llistaLi:hover {
    background-color: #f5f5f5;
}
</style>
