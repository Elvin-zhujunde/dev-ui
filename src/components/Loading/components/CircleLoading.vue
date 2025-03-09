<template>
  <svg class="circle-loading" viewBox="0 0 64 64" :style="svgStyle">
    <circle
      v-for="(d, i) in dots"
      :key="i"
      :cx="d[0]"
      :cy="d[1]"
      class="loading-dot"
      :style="{ fill: dotColor }"
    ></circle>
    <circle class="loading-bar" :style="{ stroke: color }"></circle>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  color?: string;
  size?: number | string;
  dotColor?: string;
  customIcon?: string;
}>();

const dots = [
  [60, 32],
  [51.8, 51.8],
  [32, 60],
  [12, 51.8],
  [4, 32],
  [12.2, 12.2],
  [32, 4],
  [51.8, 12.2],
];

const svgStyle = computed(() => ({
  width: typeof props.size === "number" ? `${props.size}px` : props.size,
  height: typeof props.size === "number" ? `${props.size}px` : props.size,
}));
</script>

<style scoped>
.circle-loading {
  transform: rotate(270deg);
  transform-origin: center;
  will-change: transform;
}

.loading-dot {
  r: 4px;
}

.loading-bar {
  r: 28px;
  cx: 32px;
  cy: 32px;
  fill: none;
  stroke-width: 8px;
  stroke-linecap: round;
  stroke-dasharray: 1, 175;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: loading-spin 2s cubic-bezier(0, 0, 0.3, 0.7) infinite;
  will-change: stroke-dashoffset stroke-dasharray;
}

@keyframes loading-spin {
  0% {
    stroke-dasharray: 1, 175;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 44, 175;
    stroke-dashoffset: -131;
  }
  100% {
    stroke-dasharray: 1, 175;
    stroke-dashoffset: -175;
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
