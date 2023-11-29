<template>
    <div>
        <h1>SALES</h1>
        <div v-if="this.loading">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="loading_gif">
        </div>
        <div v-else>
            <div v-for="sala in sales">
                <h2>Sala numero {{sala.id}}</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            sales: []
        }
    },
    methods: {
        async getSales() {
            this.loading = true;

            // SIMULATE API/NODE CALL
            setTimeout(() => {
                this.sales = [{ id: 1, name: "sale1" }, { id: 2, name: "sale2" }, { id: 3, name: "sale3" }]
                this.loading = false;
            }, 2000);
            
        }
    },
    created() {
        this.getSales();
    },
}
</script>

<style lang="scss" scoped></style>