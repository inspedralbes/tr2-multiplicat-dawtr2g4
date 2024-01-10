<template>
    <div>
        <div v-if="profe" class="mx-6 mt-6 flex justify-content-end">
            <button class="continuar_button mb-4 p-3 border-900 border-1" @click="tornarTaulell()">CONTINUAR
                PARTIDA</button>
        </div>
        <div class="mb-2 mx-6">
            <div v-if="profe" class="contenidor-profe" v-for="(pregunta, index) in salaInfo.preguntaActual.length">
                <div @click="mostrarGrafic(index)"
                    :class="['resum-pregunta', salaInfo.resultatsActuals.equipAcertat[index] == 1 ? 'equip1-resum' : 'equip2-resum', isGraficDesplegat[index] ? 'resum-pregunta--seleccionat' : '']">
                    <img class=jugador
                        :src="'/img/jugador-' + salaInfo.preguntaActual[index].jugadorId + '-eq-' + salaInfo.equipAtacant + '.png'"
                        alt="jugador">
                    <p>{{ salaInfo.preguntaActual[index].text_pregunta }}</p>
                    <div class="team_info_display_button_conatiner">
                        <p>EQUIP {{ salaInfo.resultatsActuals.equipAcertat[index] }}</p>
                        <svg :class="[isGraficDesplegat[index] ? 'icon_desplegat' : '']" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-arrow-right"
                            width="48" height="48" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18" />
                            <path d="M16 12l-4 -4" />
                            <path d="M16 12h-8" />
                            <path d="M12 16l4 -4" />
                        </svg>
                    </div>
                </div>
                <div :key="index"
                    :class="['grafics-respostes', salaInfo.resultatsActuals.equipAcertat[index] == 1 ? 'equip1-grafics' : 'equip2-grafics', isGraficDesplegat[index] ? 'desplegat' : 'noDesplegat']">

                    <div class="col-12 p-0 respostes_contenidor">
                        <button class="resposta text-base font-medium text-white border-round-lg border-none h-3rem"
                            v-for="(resposta, indexResposta ) in salaInfo.preguntaActual[index].respostes "
                            :key="indexResposta"
                            :class="[indexResposta === 0 ? 'resposta1' : '', indexResposta === 1 ? 'resposta2' : '', indexResposta === 2 ? 'resposta3' : '', indexResposta === 3 ? 'resposta4' : '', indexResposta == respostaCorrecta[index] ? 'resC' : '']">
                            {{ resposta.text_resposta }}
                            <svg v-if="indexResposta == respostaCorrecta[index]" xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-check Bcorr" width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l5 5l10 -10" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x Bincorr"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M18 6l-12 12" />
                                <path d="M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex mt-4">
                        <div class="grafic">
                            <h2>EQUIP 1</h2>
                            <svg v-if="salaInfo.resultatsActuals.equipAcertat[index] == 1"
                                xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crown corona"
                                width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="#ffd700" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-crown coronaNo" width="40" height="40"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="transparent"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
                            </svg>
                            <PieChart :chart-data="{
                                datasets: [{
                                    data: res1[index],
                                    label: 'Respostes',
                                    backgroundColor: ['#f87979', '#36a2eb', 'green', 'purple'],
                                }]
                            }" />
                        </div>
                        <div class="grafic">
                            <h2>EQUIP 2</h2>
                            <svg v-if="salaInfo.resultatsActuals.equipAcertat[index] == 2"
                                xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crown corona"
                                width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="#ffd700" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg"
                                class="icon icon-tabler icon-tabler-crown coronaNo" width="40" height="40"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="transparent"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" />
                            </svg>
                            <PieChart :chart-data="{
                                datasets: [{
                                    data: res2[index],
                                    label: 'Respostes',
                                    backgroundColor: ['#f87979', '#36a2eb', 'green', 'purple'],
                                }]
                            }" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="mt-6 flex flex-column gap-4">
                <div v-for="(resposta, index) in isPreguntaResposta.length">
                    <div v-if="isPreguntaResposta[index] == respostaCorrecta[index]" class="correcte">
                        <div><h1>Resposta Correcta</h1></div>
                        <div class="resum-pregunta flex-column p-0">
                            <img class=jugador
                                :src="'/img/jugador-' + salaInfo.preguntaActual[index].jugadorId + '-eq-' + salaInfo.equipAtacant + '.png'"
                                alt="jugador">
                            <p>{{ salaInfo.preguntaActual[index].text_pregunta }}</p>
                        </div>
                    </div>
                    <div v-else class="incorrecte">
                        <div>
                            <h1>Resposta Incorrecta</h1>
                        </div>
                        <div class="resum-pregunta flex-column p-0">
                            <img class=jugador
                                :src="'/img/jugador-' + salaInfo.preguntaActual[index].jugadorId + '-eq-' + salaInfo.equipAtacant + '.png'"
                                alt="jugador">
                            <p>{{ salaInfo.preguntaActual[index].text_pregunta }}</p>
                        </div>
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
        },
        profe() {
            return this.store.getProfe();
        },
        respostaCorrecta() {
            return this.store.getRespostaCorrecta();
        },
        isPreguntaResposta() {
            return this.store.getIsPreguntaResposta();
        }
    },
    methods: {
        tornarTaulell() {
            //this.$router.push('/partida'); 
            socket.emit('tornar-taulell', this.indexSala);
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
}

.respostes_contenidor > .resC {
    order: 4;
    width: 99%;
}

.respostes_contenidor button {
    width: 32%;
    height: 200px;
    font-size: 1.5rem;
    border-radius: 20px;
    border: none;
    color: white;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    align-items: center;
    position: relative;
}

.respostes_contenidor button>svg {
    position: absolute;
    right: 10px;
}

.Bincorr {
    color: #ff0000;
}

.Bcorr {
    color: #00ff00;
}

.resposta1 {
    background-color: #f87979;
}

.resposta2 {
    background-color: #36a2eb;
}

.resposta3 {
    background-color: green;
}

.resposta4 {
    background-color: purple;
}

.continuar_button {
    margin-bottom: 8px;
    border: 1px solid black;
    background-color: white;
    font-size: 1rem;
    color: #000000;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-radius: 15px;
}

.continuar_button:hover {
    background-color: black;
    color: #ffffff;
}

.jugador {
    width: 60px;
    height: 60px;
}

.resum-pregunta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 20px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.resum-pregunta>p {
    user-select: none;
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
    margin-left: auto;
    margin-right: auto;
    transition: all 0.2s ease-in-out;
}

.contenidor-profe {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
}

.correcte, .incorrecte {
    flex-grow: 1;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
}

.correcte>div,
.incorrecte>div {
    width: 100%;
    text-align: center;
}

.correcte {
    background-color: #4ade80;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.incorrecte {
    background-color: #f87171;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.equipTxt {
    font-size: 1.2rem;
    margin-right: 20px;
}

.corona {
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: #ffd700;
}

.coronaNo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    color: transparent;
}

.noDesplegat {
    transform: scaleY(0);
    transform-origin: top;
    max-height: 0;
    padding: 0;
}

.desplegat {
    transform: scaleY(1);
    transform-origin: top;
    max-height: 1000px;
}

.team_info_display_button_conatiner {
    display: flex;
    direction: row;
    gap: 1rem;
}

.icon_desplegat {
    transform: rotate(90deg)
}
</style>