<template>
    <div>
        <p>{{ temporitzador }}</p>
        <h1>{{ preguntaAct.pregunta }}</h1>
        <div v-for="resposta in preguntaAct.respostes">
            <button>{{ resposta.text }}</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';

export default {
    setup() {
        const pinia = useAppStore();
        var preguntaAct = pinia.getPreguntaAct();
        preguntaAct = {
            pregunta: 'Preunta 1',
            respostes: [{ id: 1, text: 'resposta 1', correcta: false }, 
                        { id: 2, text: 'resposta 2', correcta: false }, 
                        { id: 3, text: 'resposta 3', correcta: false }, 
                        { id: 4, text: 'resposta 4', correcta: false }],
        }
        var temporitzador = pinia.getTemporitzador();

        return { pinia, preguntaAct, temporitzador };
    },
}

</script>

<style lang="scss" scoped></style>



