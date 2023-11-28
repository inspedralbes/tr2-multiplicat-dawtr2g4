<template>
    <div>
        <h1>SALES</h1>
        <div v-if="this.loading">
            <img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="loading_gif">
        </div>
        <div v-else>
            list
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
            sales:[]
        }
    },
    methods: {
        async getSales() {
            this.loading = true;
            
            // SIMULATE API CALL
            setTimeout(() => {}, 2000);

            this.sales = [{id:1, name:"sale1"},{id:2, name:"sale2"},{id:3, name:"sale3"}]
            this.loading = false;
        }
    },
    created() {
        this.getSales();
    },
}
</script>

<style lang="scss" scoped></style>