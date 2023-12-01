<template>
    <div>
        <h1>Resultats</h1>
        <h2>L'equip {{ equipAcertat }} s'emporta aquesta pregunta</h2>
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

export default {

    components: { PieChart },
    setup() {
        const store = useAppStore();
        return { store };
    },
    computed: {
        res1() {
            let res1 = this.store.getResultatsPreguntaAct().votsEquip1;
            return res1;
        },
        res2() {
            let res2 = this.store.getResultatsPreguntaAct().votsEquip2;
            return res2;
        },
        equipAcertat() {
            return this.store.getResultatsPreguntaAct().equipAcertat;
        }
    },

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