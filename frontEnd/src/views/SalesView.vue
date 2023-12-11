<template>
    <div class="salas">
        <div class="title-container flex align-items-center justify-content-center border-round-lg m-5">
            <div class="block text-6xl font-bold mb-1 text-white">Sales</div>
        </div>
        <div v-if="this.loading">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="loading_gif">
        </div>
        <div v-else>
            <div class="grid m-5">
                <div v-for="(actual, index) in sales" class="col-6 md:col-4 lg:col-2">
                    <Card class="p-4">
                        <template #title> {{ actual.nomSala }} </template>
                        <template #content>
                            <p class="m-0">
                                Jugadors: {{ actual.jugadors.length }}
                            </p>
                            <p class="m-0">
                                Categoria: {{ actual.categoria }}
                            </p>
                        </template>
                        <template #footer>
                            <Button label="Entrar" @click="setSala(index)" />
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

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
            this.pinia.setIndexSala(id);
            socket.emit('sala-seleccionada', id)
        }
    },
    computed: {
        sales() {
            return this.pinia.getSales();
        }
    },
    components: {
        RouterLink,
        RouterView
    }
}
</script>

<style scoped>
.salas {
    position: relative;
}

.salas::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/img/landing.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(2px);
    z-index: -1;
}

.title-container {
    height: 100px;
    background-color: rgba(50, 50, 50, 0.7);
}
</style>



