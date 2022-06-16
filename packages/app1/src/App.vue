<template>
  <div>
    <HelloHome></HelloHome>
    <HelloWorld></HelloWorld>
    <div>This is App1 (port: 8001)</div>
    <ul>
      <li>link1</li>
      <li>link2</li>
      <li>link3</li>
      <li>link4</li>
    </ul>
  </div>
</template>

<script setup>
import HelloHome from './components/HelloHome.vue';
import HelloWorld from './components/HelloWorld.vue';
</script>

<style>
</style>
