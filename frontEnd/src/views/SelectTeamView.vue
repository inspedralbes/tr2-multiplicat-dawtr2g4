<template>
    <div>
        <h1 class="tit">ESCULL EQUIP</h1>
        <button class="startB" @click="començarPartida()">COMENÇAR PARTIDA</button>
        <div class="cont">
            <div>
                <button class="button e1" @click="escollirEquip(1)">Equip 1</button>
                <div v-if="!llistaJugadors">
                </div>
                <ul v-else class="llistaUl el1">
                    <li v-for="(actual, index) in equip1" :key="index" class="llistaLi">
                        {{ actual.nom }}
                    </li>
                </ul>
            </div>
            <div>
                <button class="button e2" @click="escollirEquip(2)">Equip 2</button>
                <div v-if="!llistaJugadors">
                </div>
                <ul v-else class="llistaUl el2">
                    <li v-for="(actual, index) in equip2" :key="index" class="llistaLi">
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
    computed: {

        llistaJugadors() {
            return this.store.getLlistaJugadors();
        },
        equip1() {
            return this.llistaJugadors.filter(jugador => jugador.equip === 1 && jugador.nom);
        },
        equip2() {
            return this.llistaJugadors.filter(jugador => jugador.equip === 2 && jugador.nom);
        },
        indexSala() {
            this.store.getIndexSala();
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
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    background-image: url('../components/icons/pilota-boto-fons.png');
    background-size: 120% 110%;
    background-repeat: no-repeat;
    background-position: center;
}

.e1 {
    border: 2px solid #ff4d4d;
    color: #ff4d4d;
    font-size: xx-large;
}

.e2 {
    border: 2px solid #4da6ff;
    color: #4da6ff;
    font-size: xx-large;
}

.button:hover {
    border-color: #ffffff;
    color: #ffffff;
    /* Blanco */
}

.llistaUl {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 10px;
    border-radius: 10px;
    max-height: 150px;
    overflow-y: auto;
    scrollbar-width: none;
}

.llistaUl::-webkit-scrollbar {
    width: 0;
}

.llistaLi {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    border-bottom: 1px solid black;
    padding-bottom: 2px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.el1 {
    background-color: #ff4d4d;
    color: #ff4d4d;
}

.el2 {
    background-color: #4da6ff;
    color: #4da6ff;
}

.llistaLi:hover {
    background-color: rgba(50, 50, 50, 0.7);
}

.startB {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    font-size: 1.2em;
    color: #fff;
    background-color: #32CD32;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.startB:hover {
    background-color: #228B22;
}
</style>
