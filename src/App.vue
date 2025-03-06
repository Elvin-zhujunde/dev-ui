<template>
  <div class="demo">
    <!-- 基础用法 -->
    <Loading />
    
    <!-- 带文字 -->
    <Loading text="加载中..." />
    
    <!-- 自定义大小和颜色 -->
    <Loading 
      size="48"
      loading-color="#f44336"
      text="加载中..."
      text-color="#f44336"
    />
    
    <!-- 文字在右侧 -->
    <Loading 
      text="加载中..."
      text-position="right"
    />
    
    <!-- 自定义图标 -->
    <Loading 
      :custom-icon="customSvg"
      text="自定义图标"
    />
  </div>
</template>

<script setup lang="ts">
import Loading from './components/Loading'

const customSvg = `
  <path d="M32,16c-8.8,0-16,7.2-16,16s7.2,16,16,16s16-7.2,16-16S40.8,16,32,16z"/>
`
</script>

<style>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
</style>
