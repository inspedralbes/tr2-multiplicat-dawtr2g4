<template>
    <div>
        <h1>Resultats</h1>
        <BarChart :chart-data="{
            labels: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
            datasets: [{
                data: votos,
                label: 'Respostes',
                backgroundColor: '#f87979',
            }]
        }" />
    </div>
</template>

<script>

import BarChart from './BarChart.vue';

export default {

    components: { BarChart },
    
    

}
</script>

<style lang="scss" scoped></style>