<template>
    <svg class="loading" viewBox="0 0 64 64">
      <circle
        v-for="(d, i) in dots"
        :key="i"
        :cx="d[0]"
        :cy="d[1]"
        class="loading-dot"
      ></circle>
      <circle class="loading-bar"></circle>
    </svg>
  </template>
  
  <script setup>
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
  </script>
  
  <style scoped>
  .loading {
    --loading-bar-color: rgb(10, 89, 247);
    --loading-dot-color: #dfdfdf;
    --loading-speed: 2s;
    width: 64px;
    height: 64px;
    transform: rotate(270deg);
    transform-origin: center;
    will-change: transform;
  }
  .loading-dot {
    r: 4px;
    fill: var(--loading-dot-color);
  }
  .loading-bar {
    r: 28px;
    cx: 32px;
    cy: 32px;
    fill: none;
    stroke: var(--loading-bar-color);
    stroke-width: 8px;
    stroke-linecap: round;
    stroke-dasharray: 1, 175;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: loading-spin var(--loading-speed) cubic-bezier(0, 0, 0.3, 0.7)
      infinite;
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
  