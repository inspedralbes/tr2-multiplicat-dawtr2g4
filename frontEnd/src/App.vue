<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useAppStore } from './stores/app';
import { onMounted } from 'vue';

const appStore = useAppStore();

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    appStore.setUser(JSON.parse(user));
  }
});
</script>

<template>
  <Header></Header>
  <RouterView class="grow"/>
  <Footer></Footer>
</template>

<style>
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .grow {
    flex-grow: 1;
  }
</style>
