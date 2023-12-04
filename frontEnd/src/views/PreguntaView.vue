<template>
    <div>
        <p>{{ temporitzador }}</p>
        <h1>{{ salaInfo.preguntaActual.text_pregunta }}</h1>
        <div v-for="(resposta, index ) in salaInfo.preguntaActual.respostes">
            <button v-on:click="respostaSeleccionada(index)">{{ resposta.text_resposta }}</button>
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

<style lang="scss" scoped></style>



