<template>
    <div>
        <h1 class="tit">Select Team</h1>
        <button @click="començarPartida()">COMENÇAR PARTIDA</button>
        <div class="cont">
            <div>
                <button class="button e1" @click="escollirEquip(1)">Equip 1</button>
            </div>
            <div>
                <button class="button e2" @click="escollirEquip(2)">Equip 2</button>
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
            store: null,
            indexSala: 0,
            isEquipEscollit: false
        }
    },
    methods: {
        escollirEquip(idEquip) {
            console.log("Has ecollit equip " + idEquip);
            if (this.isEquipEscollit == false && (idEquip == 1 || idEquip == 2)) {
                this.isEquipEscollit = true;
                this.store.setTeam(idEquip);
                socket.emit('equip-seleccionat', this.indexSala, idEquip);
            }
        },
        començarPartida() {
            //this.$router.push('/partida');
            socket.emit('partida-iniciada', this.indexSala) 
        }
    },
    mounted() {
        this.store = useAppStore();

        this.store.$subscribe((mutation, state) => {
            if(this.store.equipAtacant != '') {
                this.$router.push('/partida'); 
            }
        });
        //computed d'una propietat de pinia 
        //subscribe al magatgem de pinia
        //this.socket = io('http://localhost:3000');

        /*this.socket.on('equips-actualitzats', (jugadorsSala) => {
            console.log(jugadorsSala);
        });*/
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
</style>
