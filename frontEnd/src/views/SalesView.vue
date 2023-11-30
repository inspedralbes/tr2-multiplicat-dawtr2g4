<template>
    <div>
        <h1>SALES</h1>
        <div v-if="this.loading">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="loading_gif">
        </div>
        <div v-else>
            <div v-for="(actual, index) in pinia.getSales()">
                <h2>Sala numero {{ index + 1 }}</h2>
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

export default {
    setup() {
        const pinia = useAppStore();
        const sales = pinia.getSales();
        const loading = ref(true);

        onMounted(async () => {
            loading.value = true;
            try {
                const data = await fetch("http://localhost:3000/api/salas").then(response => response.json());
                pinia.setSales(data);
                loading.value = false;
            } catch (error) {
                console.log(error);
                loading.value = false;
            }
        });

        return { pinia, loading, sales };
    },
}

// data() {
//     return {
//         loading: true,
//         sales: this.pinia.getSales()
//     }
// },
// methods: {

//     async getSales() {
//         this.loading = true;
//         await fetch("http://localhost:3000/api/salas")
//             .then(response => response.json())
//             .then(data => {
//                 this.pinia.setSales(data);
//                 this.loading = false;
//             })
//             .catch(error => {
//                 console.log(error);
//                 this.loading = false;
//             });
//         // SIMULATE API/NODE CALL
//         setTimeout(() => {
//             this.sales = [{ id: 1, name: "sale1" }, { id: 2, name: "sale2" }, { id: 3, name: "sale3" }]
//             this.loading = false;
//         }, 2000);

//     },
//     setSala(id) {
//         console.log(id);
//     }
// },
// created() {
//     this.getSales();
// },
// setup() {
//     const pinia = useAppStore();
//     return {
//         pinia
//     };
// }
</script>

<style lang="scss" scoped></style>



