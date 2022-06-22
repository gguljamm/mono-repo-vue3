<template>
  <div>
    <div>여기는 어바웃</div>
    <hello-world></hello-world>
  </div>
</template>

<script setup>
// import('http://localhost:8082/remoteEntry.js')
import {defineAsyncComponent, ref } from "vue";

const isLoadingComponent = ref(true);

const HelloWorld = defineAsyncComponent(() => import('app1/HelloWorld.vue').finally(() => { isLoadingComponent.value = false }));
// const AppWrapper = defineAsyncComponent(() => import('app1/App.vue').finally(() => { isLoadingComponent.value = false }));

// const app1 = import('http://localhost:8082/remoteEntry.js').finally(() => {});
</script>
