<template>
  <div>
    <div>This is Main Service (port: 8000)</div>
    <div>
      <h1>---- This space -> App1 -----</h1>
      <div style="border: 1px solid #eee; height: 500px; width: 500px; margin: 0 auto;">
        <div v-if="isLoadingComponent">Loading HelloWorld.vue</div>
        <HelloWorld></HelloWorld>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineAsyncComponent, ref } from "vue";

const isLoadingComponent = ref(true);

const HelloWorld = defineAsyncComponent(() => import('app1/HelloWorld.vue').finally(() => { isLoadingComponent.value = false }));
// const AppWrapper = defineAsyncComponent(() => import('app1/App.vue').finally(() => { isLoadingComponent.value = false }));
</script>

<style>
#HomeApp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
