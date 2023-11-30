<template>
    <div>
        <div>
            <h2>Equip 1</h2>
            <PieChart :chart-data="{
                labels: ['Han votat', 'Falten per votar'],
                datasets: [{
                    data: [jugadorsFalten, totalV],
                    label: 'Respostes',
                    backgroundColor: ['#f87979', '#36a2eb'],
                }]
            }" />
        </div>

    </div>
</template>

<script>
import { useAppStore } from '../stores/app';

import PieChart from '../components/PieChart.vue';

export default {

    components: { PieChart },

    setup() {
        const pinia = useAppStore();

        const totalV = pinia.getTotalVotacions();
        const totalJ = pinia.getTotalJugadors();

        let jugadorsFalten = totalJ - totalV;

        return { jugadorsFalten, totalV };
    }

}
</script>

<style scoped></style>