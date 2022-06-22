<template>
  <div>
    <!-- HelloWorld msg="Welcome to Your Vue.js App"/-->
    <router-link to="/">홈</router-link>
    <router-link to="/about">어바웃</router-link>
    <router-view :data="1234" />
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
  },
}
</script>

<style>
</style>
