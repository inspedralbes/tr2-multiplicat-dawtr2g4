<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
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