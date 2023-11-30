<template>
    <div>
        <h1>SALES</h1>
        <div v-if="this.loading">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="loading_gif">
        </div>
        <div v-else>
            <div class="flex">
                <h2>Num</h2>
                <h2>Nom</h2>
                <h2>Num Jugadors</h2>
            </div>
            <div @click="setSala(index)" v-for="(actual, index) in pinia.getSales()" class="flex">

                <h2>{{ index + 1 }}</h2>
                <h2>{{ actual.nomSala }}</h2>
                <h2> {{ actual.jugadors.length }}</h2>
                <!-- <RouterLink to="/sala">
                    <button @click="">Ves a la sala {{ actual.id }}</button>
                </RouterLink> -->
            </div>

        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';
//import { io } from 'socket.io-client';
//const socket = io("http://localhost:3000");

export default {
    setup() {
        const pinia = useAppStore();
        const loading = ref(true);

        onMounted(async () => {
            loading.value = true;
            try {
                const response = await fetch("http://localhost:3000/api/salas");
                const data = await response.json();

                pinia.setSales(data.sales);

                loading.value = false;
            } catch (error) {
                console.log(error);
                loading.value = false;
            }
        });

        return { pinia, loading };
    },
    methods: {
        setSala(id) {
            socket.emit('sala-seleccionada', id)
        }
    }
}
</script>

<style scoped>
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
}

.flex>h2 {
    margin: 0;
    display: inline-block;
    width: 10%;
    /* max-width: 10%; */
}

.flex:hover {
    background-color: #e6e6e6;
    cursor: pointer;
}
</style>



