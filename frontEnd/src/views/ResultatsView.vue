<template>
    <div>
        <h1>Resultats</h1>
        <BarChart :chart-data="{
            labels: ['Donald Trump', 'Joe Biden', 'Robert Kennedy Jr.', 'Michelle Obama'],
            datasets: [{
                data: votos,
                label: 'Votos',
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