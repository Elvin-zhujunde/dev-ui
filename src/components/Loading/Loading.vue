<template>
  <div 
    :class="[
      'y-loading',
      `y-loading--${textPosition}`,
    ]"
    :style="containerStyle"
  >
    <!-- 加载图标区域 -->
    <div class="y-loading__spinner" :style="spinnerStyle">
      <component 
        :is="loadingComponent"
        :color="loadingColor"
        :size="size"
        :custom-icon="customIcon"
      />
    </div>
    
    <!-- 文字区域 -->
    <div 
      v-if="text"
      class="y-loading__text"
      :style="textStyle"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import type { LoadingProps } from './types'
import CircleLoading from './components/CircleLoading.vue'
import SpinLoading from './Loading1.vue'

const props = withDefaults(defineProps<LoadingProps>(), {
  type: 'circle',
  size: 32,
  textPosition: 'bottom',
  textColor: '#969799',
  loadingColor: '#1989fa',
  textSize: 14,
})

// 计算容器样式
const containerStyle = computed(() => ({
  fontSize: typeof props.textSize === 'number' ? `${props.textSize}px` : props.textSize,
}))

// 计算图标样式
const spinnerStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
}))

// 计算文字样式
const textStyle = computed(() => ({
  color: props.textColor,
}))

// 根据类型选择加载组件
const loadingComponent = computed(() => {
  const components = {
    circle: CircleLoading,
    spin: SpinLoading,
  }
  return components[props.type]
})
</script>

<style scoped>
.y-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.y-loading--right {
  flex-direction: row;
}

.y-loading__spinner {
  flex-shrink: 0;
}

.y-loading__text {
  margin-top: 8px;
  line-height: 1.4;
}

.y-loading--right .y-loading__text {
  margin-top: 0;
  margin-left: 8px;
}
</style>
