<template>
    <div>
        <p>{{ temporitzador }}</p>
        <h1>{{ preguntaAct.text_pregunta }}</h1>
        <div v-for="(resposta, index ) in preguntaAct.respostes">
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
            socket.emit('votacio-resposta', this.indexSala, idResposta);
        }
    },
    setup() {
        const pinia = useAppStore();
        /*var preguntaAct = pinia.getPreguntaAct();
        preguntaAct = {
            pregunta: 'Pregunta 1',
            respostes: [{ id: 1, text: 'resposta 1', correcta: false }, 
                        { id: 2, text: 'resposta 2', correcta: false }, 
                        { id: 3, text: 'resposta 3', correcta: false }, 
                        { id: 4, text: 'resposta 4', correcta: false }],
        }*/
        return { pinia };
        //return { pinia, preguntaAct };
    },
    computed: {
        temporitzador() {
            return this.pinia.getTemporitzador();
        },
        preguntaAct() {
            return this.pinia.getPreguntaAct();
        }
    },
    mounted() {
        this.temporitzador = this.pinia.getTemporitzador();
        this.pinia.$subscribe((mutation, state) => {
            if(this.pinia.votacioPreguntaEnCurs == false) {
                this.$router.push('/partida'); 
            }
        });
    }
}

</script>

<style lang="scss" scoped></style>



