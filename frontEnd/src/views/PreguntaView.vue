<template>
    <div>
        <p>{{ temporitzador }}</p>
        <h1>{{ preguntaAct.text_pregunta }}</h1>
        <div v-for="(resposta,index) in preguntaAct.respostes">
            <button @click="setResposta(pinia.getSalaActual(),index)">{{ resposta.text_resposta }}</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {
    setup() {
        const pinia = useAppStore();
        const preguntaAct = pinia.getPreguntaAct();
        var temporitzador = pinia.getTemporitzador();

        return { pinia, preguntaAct, temporitzador };
    },
    methods: {
        setResposta(idSalaAct,idResposta) {
            console.log("Sala seleccionada: " + idSalaAct);
            console.log("Resposta seleccionada: " + (idResposta+1));
            
            socket.emit('votacio-resposta', idSalaAct, idResposta)
        }
    }
}

</script>

<style lang="scss" scoped></style>



