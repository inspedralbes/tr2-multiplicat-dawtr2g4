<template>
    <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

export default {
    name: 'PieChart',
    components: { Pie },
    props: {
        chartData: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        }
    }
}
</script>                                                                                                                                                                                                                                                                   