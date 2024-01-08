<template>
    <div class="sala">
        <Button class="mt-5 ml-5" severity="primary" raised size="medium" label="Enrere" @click="tornarEnrere"/>
        <div class="title-container flex align-items-center justify-content-center border-round-lg m-5">
            <div class="block text-6xl font-bold mb-1 text-white">Escull Equip</div>
        </div>
        <button v-if="store.getProfe()" class="startB" @click="començarPartida()">COMENÇAR PARTIDA</button>
        <div class="flex justify-content-evenly">
            <div>
                <button v-if="store.getProfe()" class="button e1">Equip 1</button>
                <button v-else class="button e1" @click="escollirEquip(1)">Equip 1</button>
                <div v-if="!equip1.length"></div>
                <ul v-else class="llistaUl el1">
                    <li v-for="(actual, index) in equip1" :key="index" class="llistaLi">
                        {{ actual.nom }}
                    </li>
                </ul>
            </div>
            <div>
                <button v-if="store.getProfe()" class="button e2">Equip 2</button>
                <button v-else class="button e2" @click="escollirEquip(2)">Equip 2</button>
                <div v-if="!equip2.length"></div>
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
            if (this.isEquipEscollit == false && (idEquip == 1 || idEquip == 2)) {
                this.isEquipEscollit = true;
                this.store.setTeam(idEquip);
                socket.emit('equip-seleccionat', this.indexSala, idEquip, this.store.getUserName());
            }
        },
        començarPartida() {
            socket.emit('partida-iniciada', this.indexSala)
        },
        tornarEnrere() {
            socket.emit('abandonar-sala');
            this.$router.push('/sales');
        }
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
            return this.store.getIndexSala();
        }
    }
}
</script>

<style scoped>

.title-container {
    height: 100px;
    background-color: rgba(50, 50, 50, 0.7);
}

.sala {
    position: relative;
}

.sala::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/img/landing.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(2px);
    z-index: -1;
}

.button {
    height: 300px;
    width: 300px;
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
    border: 2px solid #3273b4;
    color: #3273b4;
    font-size: xx-large;
}

.button:hover {
    border-color: #ffffff;
    color: #ffffff;
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
    background-color: #3273b4;
    color: #3273b4;
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
