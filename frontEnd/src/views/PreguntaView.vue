<template>
        <div class="temporitzador w-max cont mt-6"><img src="/img/pilota-beisbol-cronometre.png" width="90" height="90" alt=""><p class="temp text-align text-3xl font-semibold">{{ temporitzador }}</p></div>
        <div v-for="pregunta in salaInfo.preguntaActual" class="pregunta-respostes grid mt-6">
            <h1 class="col-12 text-3xl text-center border-1 border-round-lg">{{ pregunta.text_pregunta }}</h1>
            <img class = jugador :src="'/img/jugador-' + pregunta.jugadorId + '.png'" alt="">
            <div class="col-12 mt-4 p-0 grid-container">
                <button class="resposta text-2xl font-medium text-white border-round-lg border-none h-10rem" v-for="(resposta, indexResposta) in pregunta.respostes" v-on:click="respostaSeleccionada(pregunta.id, indexResposta)">{{ resposta.text_resposta }}</button>
            </div>

        </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {
    methods: {
        respostaSeleccionada(idPregunta, idResposta) {
            if (this.isPreguntaResposta == false) {
            console.log("Has seleccionat la resposta " + idResposta + " de la pregunta " + idPregunta);
            this.isPreguntaResposta = true;
            socket.emit('vot-resposta', this.indexSala, idPregunta, idResposta);
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
        }
    },
    mounted() {
        this.temporitzador = this.pinia.getTemporitzador();

    }
}

</script>

<style lang="scss" scoped>
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
        margin: 0 5rem;
    }
    
    .cont {
        position: relative;
    }

    .temp {
        position: absolute;
        top: 0;
        left: 33%;
    }

    @keyframes rotacioInfinita {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .temporitzador {
        margin: 0 auto;
    }

    .temporitzador > img {
        animation: rotacioInfinita 8s linear infinite;
    }

    .jugador {
        width: 60px;
        height: 60px;
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

</style>



