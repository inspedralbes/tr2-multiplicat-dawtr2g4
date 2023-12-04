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
        }
    },
    setup() {
        var categories;

        categories = [
            { id: 1, nom: "Nombres i Operacions" },
            { id: 2, nom: "Equacions" },
            { id: 3, nom: "Funcions" },
            { id: 4, nom: "Mesures" },
            { id: 5, nom: "Geometria" },
            { id: 6, nom: "Estadística" }
        ]

        //SIMULACIÓ DE FETCH DE CATEGORIES (AFEGIR al BACKEND o al FRONTEND????)
        // onMounted(async () => {
        //     try {
        //         const response = await fetch("http://localhost:3000/api/categories");
        //         categories = await response.json();
        //     } catch (error) {
        //         console.log(error);
        //     }
        // });

        return { categories };
    },
    computed: {

    },
    mounted() {

    }
}

</script>

<style scoped></style>