<template>
    <div class="mx-8 mt-4">
        <button class="continuar_button mb-4 p-3 border-900 border-1 bg-white" @click="tornarTaulell()">CONTINUAR
            PARTIDA</button>
    </div>
    <div class="mx-8 my-4">
    <div class="mb-2" v-for="(pregunta, index) in salaInfo.preguntaActual.length">
        <div @click="mostrarGrafic(index)"
            :class="['resum-pregunta', salaInfo.resultatsActuals.equipAcertat[index] == 1 ? 'equip1-resum' : 'equip2-resum', isGraficDesplegat[index] ? 'resum-pregunta--seleccionat' : '']">
            <img class=jugador :src="'/img/jugador-' + salaInfo.preguntaActual[index].jugadorId + '.png'" alt="">
            <p>{{ salaInfo.preguntaActual[index].text_pregunta }}</p>
            <p>EQUIP {{ salaInfo.resultatsActuals.equipAcertat[index] }}</p>
        </div>
        <div v-if="isGraficDesplegat[index]"
            :class="['grafics-respostes', salaInfo.resultatsActuals.equipAcertat[index] == 1 ? 'equip1-grafics' : 'equip2-grafics']">
            <h1 class="informacio_encert text-center">L'EQUIP {{ salaInfo.resultatsActuals.equipAcertat[index] }} S'EMPORTA
                AQUESTA PREGUNTA</h1>
            <div class="col-12 p-0 respostes_contenidor">
                <button class="resposta text-base font-medium text-white border-round-lg border-none h-3rem"
                    v-for="(resposta, indexResposta ) in salaInfo.preguntaActual[index].respostes">{{
                        resposta.text_resposta }}</button>
            </div>
            <div class="flex mt-4">
                <div class="grafic">
                    <h2>EQUIP 1</h2>
                    <PieChart :chart-data="{
                        //labels: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
                        datasets: [{
                            data: res1[index],
                            label: 'Respostes',
                            backgroundColor: ['#f87979', '#36a2eb', 'green', 'purple'],
                        }]
                    }" />
                </div>
                <div class="grafic">
                    <h2>EQUIP 2</h2>
                    <PieChart :chart-data="{
                        datasets: [{
                            //labels: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
                            data: res2[index],
                            label: 'Respostes',
                            backgroundColor: ['#f87979', '#36a2eb', 'green', 'purple'],
                        }]
                    }" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import PieChart from '../components/PieChart.vue';

import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {

    components: { PieChart },
    setup() {
        const store = useAppStore();
        return { store };
    },
    data() {
        return {
            isGraficDesplegat: [false, false, false, false]
        }
    },
    computed: {
        res1() {
            let res1 = this.store.getResultatsActuals().votsEquip1;
            return res1;
        },
        res2() {
            let res2 = this.store.getResultatsActuals().votsEquip2;
            return res2;
        },
        salaInfo() {
            return this.store.getSalaInfo();
        },
        indexSala() {
            return this.store.getIndexSala();
        }
    },
    methods: {
        tornarTaulell() {
            //this.$router.push('/partida'); 
            socket.emit('tornar-taulell', this.indexSala);
            socket.emit('calcular-efectes-pregunta', this.indexSala); // CREO QUE ESTO NO HACE NADA
        },
        mostrarGrafic(index) {
            this.resetejarMostrarGrafic(index);
            this.isGraficDesplegat[index] = !this.isGraficDesplegat[index];
        },
        resetejarMostrarGrafic(index) {
            for (let i = 0; i < this.isGraficDesplegat.length; i++) {
                if (i != index) {
                    this.isGraficDesplegat[i] = false;
                }
            }
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
h1 {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.flex {
    display: flex;
    justify-content: space-around;
}

.grafic>h2 {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.grafic {
    display: inline-block;
    /*width: 600px;
    height: 600px;*/
    width: fit-content;
    height: fit-content;
    margin-left: auto;
    margin-right: auto;
}

.respostes_contenidor {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.respostes_contenidor .resposta:nth-child(1) {
    background-color: #f87979;
}

.respostes_contenidor .resposta:nth-child(2) {
    background-color: #36a2eb;
}

.respostes_contenidor .resposta:nth-child(3) {
    background-color: green;
}

.respostes_contenidor .resposta:nth-child(4) {
    background-color: purple;
}

.continuar_button {
    float: right;
    margin-right: -8px;
}

.informacio_encert {
    clear: both;
}

.jugador {
    width: 60px;
    height: 60px;
}

.resum-pregunta {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    border-radius: 20px;
    padding: 10px;
}

.equip1-resum {
    background-color: rgb(255, 77, 77);
}

.equip2-resum {
    background-color: rgb(77, 166, 255);
}

.equip1-grafics {
    background-color: rgba(255, 77, 77, 0.4);
}

.equip2-grafics {
    background-color: rgba(77, 166, 255, 0.4);
}

.resum-pregunta--seleccionat {
    border-radius: 20px 20px 0px 0px;
}

.grafics-respostes {
    width: 100%;
    border-radius: 0px 0px 20px 20px;
    padding: 20px;
    height: fit-content;
}
</style>