<template>
    <div style="flex-grow: 1;">
        <div class="temporitzador-container w-max mt-6"><img src="/img/pilota-beisbol-cronometre.png" width="70" height="70"
                alt="">
            <p class="temporitzador text-align text-2xl font-semibold">{{ temporitzador }}</p>
        </div>
        <!-- :class="{ 'pregunta-respostes': salaInfo.preguntaActual.length == 1, 'contenidor-dos-preguntes': salaInfo.preguntaActual.length == 2, 'contenidor-tres-preguntes': salaInfo.preguntaActual.length == 3, 'contenidor-tres-preguntes': salaInfo.preguntaActual.length == 4 }" -->
        <div class="preguntes">
            <div v-for="(pregunta, indexPregunta) in salaInfo.preguntaActual" class="pregunta-respostes grid mt-6 mb-4" :class="{dNone: preguntaResp[indexPregunta] === 1}">
                <div class="contenidor-jugador-pregunta">
                    <img class="jugador"
                        :src="'/img/jugador-' + pregunta.jugadorId + '-eq-' + salaInfo.equipAtacant + '.png'" alt="jugador">
                    <h1 class=" p-2 text-3xl text-center border-1 border-round-lg">
                        {{ pregunta.text_pregunta }}
                    </h1>
                </div>
                <div v-if="!profe" class="col-12 mt-4 p-0 contenidor-respostes">
                    <button class="resposta text-2xl font-medium text-white border-round-lg border-none h-10rem sel"
                        v-for="(resposta, indexResposta) in pregunta.respostes"
                        :class="{ selected: selectedIndices[indexPregunta] === indexResposta }"
                        @click="respostaSeleccionada(indexPregunta, indexResposta)">
                        {{ resposta.text_resposta }}
                    </button>
                </div>
                <div v-else class="col-12 mt-4 p-0 contenidor-respostes">
                    <button class="resposta text-2xl font-medium text-white border-round-lg border-none h-10rem"
                        v-for="(resposta, indexResposta) in pregunta.respostes">
                        {{ resposta.text_resposta }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {
    inheritAttrs: false,
    data() {
        return {
            preguntaResp: {},
            selectedIndices: {},
        }
    },
    methods: {
        respostaSeleccionada(idPregunta, idResposta) {
            if (this.isPreguntaResposta[idPregunta] === -1) {
                this.isPreguntaResposta[idPregunta] = idResposta;
                this.preguntaResp[idPregunta] = 1;
                this.selectedIndices[idPregunta] = idResposta;
                socket.emit('vot-resposta', this.indexSala, this.isPreguntaResposta);
            }
        }
    },
    setup() {
        const pinia = useAppStore();
        return { pinia };
    },
    computed: {
        temporitzador() {
            let temporitzador = this.pinia.getTemporitzador();
            return temporitzador.toString().padStart(2, '0');
        },
        salaInfo() {
            return this.pinia.getSalaInfo();
        },
        indexSala() {
            return this.pinia.getIndexSala()
        },
        isPreguntaResposta() {
            return this.pinia.getIsPreguntaResposta();
        },
        profe() {
            return this.pinia.getProfe();
        }
    },
    mounted() {
        this.temporitzador = this.pinia.getTemporitzador();

    }
}

</script>

<style scoped>
.sel {
    cursor: pointer;
}

.contenidor-respostes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px 20px;
}

.contenidor-respostes--tres-preguntes {
    gap: 10px 5px;
}

.contenidor-respostes .resposta:nth-child(1) {
    background-color: #f87979;
}

.contenidor-respostes .resposta:nth-child(2) {
    background-color: #36a2eb;
}

.contenidor-respostes .resposta:nth-child(3) {
    background-color: green;
}

.contenidor-respostes .resposta:nth-child(4) {
    background-color: purple;
}


.temporitzador {
    position: absolute;
    top: 22px;
    left: 22px;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px 20px;
}

.grid-container .resposta:nth-child(1) {
    background-color: #f87979;
}

.grid-container .resposta:nth-child(2) {
    background-color: #36a2eb;
}

.grid-container .resposta:nth-child(3) {
    background-color: green;
}

.grid-container .resposta:nth-child(4) {
    background-color: purple;
}

.pregunta-respostes {
    transition: all 0.5s ease-in-out;
    margin: 0 5rem;
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

.temporitzador-container>img {
    animation: rotacioInfinita 8s linear infinite;
    width: 70px;
    height: 70px;
}

.jugador {
    width: 60px;
    height: 60px;
}

.preguntes {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.contenidor-tres-preguntes__item,
.contenidor-quatre-preguntes__item {
    display: grid;
    grid-template-rows: 1fr 3fr;
    max-height: 200px;
}

.contenidor-tres-preguntes__item:nth-child(3) {
    grid-column: 1/span 2;
}

@media (min-width: 992px) {
    .pregunta-respostes {
        margin: 0 20%;
    }
}

.temporitzador {
    margin: 0 auto;
}

.temporitzador>img {
    animation: rotacioInfinita 8s linear infinite;
}

@media (min-width: 992px) {
    .pregunta-respostes {
        margin: 0 20%;
    }
}

@media (min-width: 1400px) {
    .pregunta-respostes {
        margin: 0 30%;
    }
}

.selected {
    filter: brightness(0.7) !important;
}

.contenidor-jugador-pregunta>img {
    margin: auto;
    display: block;
}

.contenidor-jugador-pregunta>h1 {
    min-width: 761.219px;
}

.dNone {
    display: none;
}
</style>
