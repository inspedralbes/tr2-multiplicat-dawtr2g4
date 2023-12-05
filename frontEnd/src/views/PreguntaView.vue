<template>
        <div class="temporitzador w-max"><p class="text-center text-3xl font-semibold text-white pt-2 mt-6 burst-12">{{ temporitzador }}</p></div>
        <div class="pregunta-respostes grid mt-6">
            <h1 class="col-12 text-3xl text-center border-1 border-round-lg">{{ salaInfo.preguntaActual.text_pregunta }}</h1>
            <div class="col-12 mt-4 p-0 grid-container">
                <button class="resposta text-2xl font-medium text-white border-round-lg border-none h-10rem" v-for="(resposta, index ) in salaInfo.preguntaActual.respostes" v-on:click="respostaSeleccionada(index)">{{ resposta.text_resposta }}</button>
            </div>
        </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {
    data() {
        return {
            indexSala: 0, // indexSala hardcodeado
        }
    },
    methods: {
        respostaSeleccionada(idResposta) {
            console.log("Has seleccionat la resposta" + idResposta);
            socket.emit('vot-resposta', this.indexSala, idResposta);
        }
    },
    setup() {
        const pinia = useAppStore();
        return { pinia };
    },
    computed: {
        temporitzador() {
            return this.pinia.getTemporitzador();
        },
        salaInfo() {
            return this.pinia.getSalaInfo();
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
    
    .burst-12 {
      background: rgb(128,0,0);
      width: 60px;
      height: 60px;
      position: relative;
      text-align: center;
    }
    .burst-12:before, .burst-12:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 60px;
      width: 60px;
      background: rgb(128,0,0);
      z-index: -1;
    }
    .burst-12:before {
      transform: rotate(30deg);
    }
    .burst-12:after {
      transform: rotate(60deg);
    }

    .temporitzador {
        margin: 0 auto;
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



