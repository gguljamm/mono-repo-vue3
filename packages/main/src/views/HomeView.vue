<template>
  <div>
    <div>이곳은 홈..!</div>
    <div>{{ a }}</div>
    <button @click="addNum">increase</button>
    <div>{{ today }}</div>
    <div>{{ props.data }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import dayjs from "dayjs";

const props = defineProps(['data']);

const a = ref<number>(0);
const addNum = () => {
  a.value += 1;
};
const today = ref<number>(dayjs().valueOf())
</script>

<style lang="scss"></style>
