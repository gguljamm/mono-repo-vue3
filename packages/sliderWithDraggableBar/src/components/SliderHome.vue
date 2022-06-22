<template>
  <div style="padding: 20px;">
    <div style="text-align: center; font-weight: bold">BAR가 drag 가능한 슬라이더</div>
    <div style="text-align: center; font-size: 14px">왼쪽으로 이동시 범위 확장</div>
    <Slider
      :startDateTime="dayjs().subtract(10, 'h').format('YYYY-MM-DD HH:mm:ss')"
      :둥DateTime="dayjs().format('YYYY-MM-DD HH:mm:ss')"
    ></Slider>
<!--    <SliderTemp-->
<!--      :startDateTime="'2022-06-20 10:00:00'"-->
<!--      :둥DateTime="'2022-06-21 10:00:00'"-->
<!--    ></SliderTemp>-->
  </div>
</template>

<script setup>
import Slider from './Slider.vue';
import dayjs from "dayjs";
// import SliderTemp from './SliderTemp.vue';
</script>
