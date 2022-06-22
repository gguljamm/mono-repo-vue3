<template>
  <div class="">
    <div class="customSlider">
      <div class="sliderBar" ref="sliderBar">
        <div class="bullet"
             :class="target ? 'active' : ''"
             :style="{ left: `${ handler1 }%` }"
             @mousedown="startEvent($event, 1)"
        >
          <div class="sliderTooltip"><div><span>{{ dayjs(nowMinDate).format('YYYY-MM-DD HH:mm:ss') }}</span></div></div>
        </div>
        <div class="bullet"
             :class="target ? 'active' : ''"
             :style="{ left: `${ handler2 }%` }"
             @mousedown="startEvent($event, 2)"
        >
          <div class="sliderTooltip"><div><span>{{ dayjs(nowMaxDate).format('YYYY-MM-DD HH:mm:ss') }}</span></div></div>
        </div>
        <div class="progressBar"
             :class="target ? 'active' : ''"
             :style="{ left: `${ handler1 < handler2 ? handler1 : handler2 }%`, width: `${ handler1 < handler2 ? handler2 - handler1  : handler1 - handler2 }%` }"
             @mousedown="startEvent($event, 3)"
        ></div>
      </div>
      <div class="" style="padding: 20px; text-align: center;">
        <div>{{ dayjs(nowMinDate).format('YYYY-MM-DD HH:mm:ss') }} ~ {{ dayjs(nowMaxDate).format('YYYY-MM-DD HH:mm:ss') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import dayjs from 'dayjs';
const props = defineProps(['startDateTime', 'endDateTime']);
const emit = defineEmits(['sliderChange']);

const today:any = dayjs();
const min:any = dayjs(props.startDateTime);

const arrMinCondition:number[] = [1, 2, 5, 10, 30, 90];
const value1 = ref<number>(dayjs(props.startDateTime).valueOf());
const value2 = ref<number>(dayjs(props.endDateTime).valueOf());
const sliderMin = ref<number>(0);
const sliderMax = ref<number>(today.valueOf());

const setSliderMin = () => {
  if (!arrMinCondition.some((v) => {
    const temp = today.subtract(v, 'day').valueOf();
    const min = value1.value > value2.value ? value2.value : value1.value;
    if (temp < min) {
      sliderMin.value = temp;
      initSlider();
      return true;
    } else {
      return false;
    }
  })) {
    if (today.subtract(90, 'day').valueOf() > min.valueOf()) {
      sliderMin.value = min.valueOf();
      initSlider();
    }
  }
};

const nowMinDate = computed(() => {
  return value1.value < value2.value ? value1.value : value2.value;
});

const nowMaxDate = computed(() => {
  return value1.value > value2.value ? value1.value : value2.value;
});

const sliderBar = ref(null);
const handler1 = ref<number>(0);
const handler2 = ref<number>(0);
const minPoint = ref<number>(0);
const maxPoint = ref<number>(0);
const target = ref<number>(0);
const initPercent = ref<number>(0);
const initPosition = ref<number>(0);

const startEvent = (e: MouseEvent, t: number) => {
  e.preventDefault();
  target.value = t;
  initPercent.value = handler2.value > handler1.value ? handler1.value : handler2.value;
  initPosition.value = e.x;
}
const moveBulletEvent = (e: MouseEvent) => {
  e.preventDefault();
  if (target.value) {
    const tot:number = maxPoint.value - minPoint.value;
    const acc:number = sliderMax.value - sliderMin.value;
    if (target.value !== 3) {
      const now = e.x - minPoint.value;
      let percent:number = Math.round( (now / tot * 100) * 1e4 ) / 1e4;
      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }
      if (target.value === 1) {
        handler1.value = percent;
        value1.value = sliderMin.value + (acc * (percent / 100));

      } else if (target.value === 2) {
        handler2.value = percent;
        value2.value = sliderMin.value + (acc * (percent / 100));
      }
    } else if (target.value === 3) {
      const now:number = Math.round((((e.x - initPosition.value) / tot) * 100) * 1e4) / 1e4;
      const between:number = handler1.value > handler2.value ? handler1.value - handler2.value : handler2.value - handler1.value;
      const min:any = handler1.value > handler2.value ? handler2 : handler1;
      const max:any = handler1.value > handler2.value ? handler1 : handler2;
      if (initPercent.value + now <= 0) {
        min.value = 0;
        max.value = between;
      } else if (initPercent.value + now + between >= 100) {
        min.value = 100 - between;
        max.value = 100;
      } else {
        min.value = initPercent.value + now;
        max.value = initPercent.value + now + between;
      }
      value1.value = sliderMin.value + (acc * (handler1.value / 100));
      value2.value = sliderMin.value + (acc * (handler2.value / 100));
    }
  }
}
const clearBulletEvent = () => {
  if (target.value && (props.startDateTime !== dayjs(nowMinDate.value).format('YYYY-MM-DD HH:mm:ss') || props.endDateTime !== dayjs(nowMaxDate.value).format('YYYY-MM-DD HH:mm:ss'))) {
    emit('sliderChange', {
      startDateTime: dayjs(nowMinDate.value).format('YYYY-MM-DD HH:mm:ss'),
      endDateTime: dayjs(nowMaxDate.value).format('YYYY-MM-DD HH:mm:ss'),
    });
    setSliderMin();
  }
  target.value = 0;
  initPosition.value = 0;
}

const initSlider = () => {
  if (sliderBar.value) {
    const rect:any = sliderBar.value.getBoundingClientRect();
    handler1.value = Math.round((value1.value - sliderMin.value) / (sliderMax.value - sliderMin.value) * 100 * 1e4) / 1e4;
    handler2.value = Math.round((value2.value - sliderMin.value) / (sliderMax.value - sliderMin.value) * 100 * 1e4) / 1e4;
    minPoint.value = rect.left;
    maxPoint.value = rect.left + rect.width;
  }
}

const resizeObserver = ref<any>(null);
const lastWidth = ref<number>(null);

onMounted(() => {
  setSliderMin();
  window.addEventListener('mousemove', moveBulletEvent);
  window.addEventListener('mouseup', clearBulletEvent);
  const resizeObserver = new ResizeObserver((entries) => {
    let width;
    for (let entry of entries) {
      if(entry.contentBoxSize) {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
        width = contentBoxSize.inlineSize;
      } else {
        width = entry.contentRect.width;
      }
    }
    if (lastWidth.value && lastWidth.value !== width) {
      initSlider();
    }
    lastWidth.value = width;
  });
  resizeObserver.observe(document.body);
});
</script>

<style lang="scss">
.customSlider{
  width: 100%;
  height: 40px;
  padding: 15px 0;
  .sliderBar{
    width: 100%;
    background-color: rgb(226,232,240);
    height: 10px;
    border-radius: 5px;
    position: relative;
    .bullet{
      position: absolute;
      width: 20px;
      height: 20px;
      transform: translate(-50%, -50%);
      border-radius: 10px;
      box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, .32);
      background-color: #FFF;
      cursor: ew-resize;
      top: 50%;
      z-index: 1;
      transition: left 0.5s ease 0s;
      &.active{
        transition-duration: 0s;
      }
      &:active{
        background-color: rgb(237, 236, 254);
        .sliderTooltip{
          visibility: visible;
        }
      }
      .sliderTooltip{
        top: -10px;
        left: 50%;
        transform: translate(-50%,-100%);
        position: absolute;
        visibility: hidden;
        > div{
          font-size: 14px;
          white-space: nowrap;
          padding: 2px 5px;
          min-width: 20px;
          text-align: center;
          color: #fff;
          border-radius: 5px;
          background-color: rgba(51, 51, 51, .8);
          border-color: rgba(51, 51, 51, .8);
          box-sizing: content-box;
          &:after{
            top: 100%;
            left: 50%;
            transform: translate(-50%, 0);
            height: 0;
            width: 0;
            border-color: transparent;
            border-style: solid;
            border-width: 5px;
            border-top-color: inherit;
            position: absolute;
            content: '';
          }
        }
      }
    }
    .progressBar{
      background: #6366f1;
      background: linear-gradient(to right, rgb(99, 102, 241), rgba(99, 102, 241, .5));
      width: 100%;
      height: 10px;
      position: absolute;
      z-index: 0;
      cursor: grab;
      transition-property: width, left;
      transition-duration: 0.5s;
      &:active{
        cursor: grabbing;
      }
      &.active{
        transition-duration: 0s;
      }
    }
  }
}
</style>
