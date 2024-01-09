<template>
    <div id="wrapper"></div>
    <div class="contenidor">
        <img :src="'/img/tut-' + pantallaActualTutorial + '.PNG'" alt="">
    </div>
    <Modal v-show="esModalVisible" @close="closeModal" @button-clicked="handleButtonClick" v-bind:pantallaActual="pantallaActualTutorial" />
</template>

<script>
import { useAppStore } from '../stores/app';
import Modal from '../components/Modal.vue';

export default {
    components: {
        Modal,
    },
    data() {
        return {
            esModalVisible: true,
            pantallaActualTutorial: 1,
            imatgeActualTutorial: 1
        }
    },
    methods: {
        showModal() {
            this.esModalVisible = true;
        },
        closeModal() {
            this.$router.push('/');
        },
        handleButtonClick(data) {
            this.pantallaActualTutorial = data;
            this.canviImatgeActualTutorial();
        }
    },
    created() {
        const store = useAppStore();
    },
}

</script>

<style scoped>

#wrapper {
    margin-left:auto;
    margin-right:auto;
    width:960px;
}
.contenidor img {
    width: 100%;
    height: auto;
}

</style>