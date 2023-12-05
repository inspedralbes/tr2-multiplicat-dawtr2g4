<template>
    <div>
        <h1>Resultats</h1>
        <h2>L'equip {{ salaInfo.resultatsActuals.equipAcertat }} s'emporta aquesta pregunta</h2>
        <button @click="tornarTaulell()">CONTINUAR</button>
        <div class="flex">
            <div class="grafic">
                <h2>Equip 1</h2>
                <PieChart :chart-data="{
                    labels: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
                    datasets: [{
                        data: res1,
                        label: 'Respostes',
                        backgroundColor: ['#f87979', '#36a2eb', 'green', 'purple'],
                    }]
                }" />
            </div>
            <div class="grafic">
                <h2>Equip 2</h2>
                <PieChart :chart-data="{
                    labels: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
                    datasets: [{
                        data: res2,
                        label: 'Respostes',
                        backgroundColor: ['#f87979', '#36a2eb', 'green', 'purple'],
                    }]
                }" />
            </div>
        </div>
    </div>
</template>

<script>

import PieChart from '../components/PieChart.vue';

import { useAppStore } from '../stores/app';
import { socket } from '@/socket';

export default {

    components: { PieChart },
    setup() {
        const store = useAppStore();
        return { store };
    },
    computed: {
        res1() {
            let res1 = this.store.getResultatsActuals().votsEquip1;
            return res1;
        },
        res2() {
            let res2 = this.store.getResultatsActuals().votsEquip2;
            return res2;
        },
        salaInfo() {
            return this.store.getSalaInfo();
        },
        indexSala() {
            return this.store.getIndexSala();
        }
    },
    methods: {
        tornarTaulell() {
            //this.$router.push('/partida'); 
            socket.emit('tornar-taulell', this.indexSala);
            socket.emit('calcular-efectes-pregunta', this.indexSala);
        }
    },
    mounted() {

    }
}
</script>

<style scoped>

h1{
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}
.flex {
    display: flex;
    justify-content: space-around;
}
.grafic > h2 {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}
.grafic {
    display: inline-block;
    width: 600px;
    height: 600px;
    margin-left: auto;
    margin-right: auto;
}

</style>