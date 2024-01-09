<template>
    <div class="landing flex justify-content-center">
        <div class="flex flex-column justify-content-center">
            <div class="container flex flex-column align-items-center gap-6 py-5 px-8 border-round-lg">
                <div class="block text-8xl font-bold mb-1 text-white">MathBall</div>
                <div v-if="pinia.getProfe()">
                    <RouterLink to="/crearSala">
                        <Button id="buttonCreate" severity="primary" raised rounded size="large" label="CREAR SALA" />
                    </RouterLink>
                </div>
                <RouterLink to="/sales">
                    <Button id="buttonSales" severity="primary" raised rounded size="large" label="JUGAR" />
                </RouterLink>
                <RouterLink to="/tutorial">
                    <Button id="buttonTutorial" severity="primary" raised rounded size="large" label="INICIAR TUTORIAL" />
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {
    components: { RouterLink },
    methods: {
        iniciarTutorial(){
            this.$router.push('/tutorial')
        }
    },
    setup() {
        const pinia = useAppStore()
        socket.emit('abandonar-sala');

        return {
            pinia,
        }
    },
}
</script>

<style scoped>
.landing {
    position: relative;
}

.landing::before {
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

.container {
    background-color: rgba(50, 50, 50, 0.7);
}
</style>