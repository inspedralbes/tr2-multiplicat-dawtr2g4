<template>
    <div>
        <h1>Creació de sala</h1>

        <label for="nom">Nom de la partida</label>
        <input type="text" id="nom" v-model="partida.nom" required>

        <label for="categoria">Categoria</label>
        <select id="categoria" v-model="partida.categoria" required>
            <option v-for="(actual, index) in categories" :value="actual.id">{{ actual.nom }}</option>
        </select>
        <label for="numJugadors1">Nombre de jugadors per equip</label>
        <input type="number" id="numJugadors1" v-model="partida.numJugadors1" required>

        <label for="numJugadors2">Nombre de jugadors per equip</label>
        <input type="number" id="numJugadors2" v-model="partida.numJugadors2" required>
        <button @click="enviarPartida()">Crear partida</button>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {
    data() {
        return {
            categories: [],
            partida: {
                nom: '',
                categoria: '',
                numJugadors1: '',
                numJugadors2: '',
            }
        }
    },
    methods: {
        enviarPartida() {
            console.log(this.partida);
            //socket.emit('crear-partida', this.partida);
        },
    },
    computed: {

    },
    created() {
        fetch("http://localhost:8000/api/getCategories")
            .then(response => response.json())
            .then(data => {
                this.categories = data;
            });
    },
}

</script>

<style scoped></style>