<template>
    <div id="wrapper"></div>
    <div class="contenidor">
        <img :src="'/img/tutorial-' + imatgeActualTutorial + '.png'" alt="">
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
        },
        canviImatgeActualTutorial() {
            if (this.pantallaActualTutorial == 1) {
                this.imatgeActualTutorial = 1;
            } else if (this.pantallaActualTutorial >= 2 && this.pantallaActualTutorial <=5) {
                this.imatgeActualTutorial = 2;
            } else if (this.pantallaActualTutorial == 6) {
                this.imatgeActualTutorial = 3;
            } else if (this.pantallaActualTutorial >= 7 && this.pantallaActualTutorial <=9) {
                this.imatgeActualTutorial = 4;
            } else if (this.pantallaActualTutorial >= 10 && this.pantallaActualTutorial <= 12) {
                this.imatgeActualTutorial = 5;
            }
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