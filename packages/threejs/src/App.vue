<template>
  <div>
    <div>
      <button @click="tab = 'home'">홈</button>
      <button @click="tab = 'tokyo'">도쿄</button>
    </div>
    <Home v-if="tab === 'home'">홈</Home>
    <Tokyo v-if="tab === 'tokyo'">도쿄</Tokyo>
  </div>
</template>

<script setup>
import Home from './components/Home.vue';
import Tokyo from './components/Tokyo.vue';
import { ref } from 'vue';

const tab = ref('home');
</script>

<style>
</style>
