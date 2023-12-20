<template>
    <div>
        <div>
            <h2>ESPERANT A ALTRES JUGADORS QUE FALTEN PER RESPONDRE...</h2>
            <div class="grafic">
                <PieChart :chart-data="{
                    labels: ['Han votat', 'Falten per votar'],
                    datasets: [{
                        data: totalVotacions,
                        label: 'Respostes',
                        backgroundColor: ['#f87979', '#36a2eb'],
                    }]
                }" />
            </div>
        </div>

    </div>
</template>

<script>
import { useAppStore } from '../stores/app';

import PieChart from '../components/PieChart.vue';

export default {

    components: { PieChart },
    computed: {
        totalVotacions() {
            const store = useAppStore();
            let totalV = store.getTotalVotacions();
            let totalJ = store.getTotalJugadors();
            return [totalV, totalJ - totalV];
        }
    },

}
</script>

<style scoped>

h2{
    margin-left: auto;
    margin-right: auto;
}
.grafic {
    width: 600px;
    height: 600px;
    margin-left: auto;
    margin-right: auto;
}
</style>