<template>
  <div class="demo">
    <div class="section">
      <h2>组件用法</h2>
      
      <!-- 基础用法 -->
      <div class="card">
        <h3>基础用法</h3>
        <DMLoading />
      </div>

      <!-- 带文字 -->
      <div class="card">
        <h3>带文字</h3>
        <DMLoading text="加载中..." />
      </div>

      <!-- 自定义大小和颜色 -->
      <div class="card">
        <h3>自定义样式</h3>
        <DMLoading 
          size="48"
          loading-color="#f44336"
          text="加载中..."
          text-color="#f44336"
        />
      </div>

      <!-- 文字在右侧 -->
      <div class="card">
        <h3>文字位置</h3>
        <DMLoading 
          text="加载中..."
          text-position="right"
        />
      </div>

      <!-- 自定义图标 -->
      <div class="card">
        <h3>自定义图标</h3>
        <DMLoading text="自定义图标">
          <template #icon>
            <svg viewBox="0 0 64 64" width="100%" height="100%">
              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="4" />
            </svg>
          </template>
        </DMLoading>
      </div>
    </div>

    <div class="section">
      <h2>指令用法</h2>
      
      <!-- 基础指令用法 -->
      <div class="card" v-loading="loadingRef">
        <h3>基础用法</h3>
        <p>这是一些内容</p>
        <button @click="toggleLoading">切换 Loading</button>
      </div>

      <!-- 自定义配置指令 -->
      <div 
        class="card" 
        v-loading="customLoading"
        v-loading-config="{
          text: '加载中...',
          loadingColor: '#f44336',
          textColor: '#f44336',
          size: 48
        }"
      >
        <h3>自定义配置</h3>
        <p>这是一些内容</p>
        <button @click="toggleCustomLoading">切换 Loading</button>
      </div>
    </div>

    <div class="section">
      <h2>API 调用方式</h2>
      
      <!-- 全屏加载 -->
      <div class="card">
        <h3>全屏加载</h3>
        <button @click="showFullscreenLoading">显示全屏 Loading</button>
      </div>
      
      <!-- 区域加载 -->
      <div class="card" ref="loadingTarget">
        <h3>区域加载</h3>
        <p>这是一些内容</p>
        <button @click="showTargetLoading">显示区域 Loading</button>
      </div>
      
      <!-- 自定义配置 -->
      <div class="card">
        <h3>自定义配置</h3>
        <button @click="showCustomLoading">显示自定义 Loading</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const loadingRef = ref(false)
const customLoading = ref(false)
const loadingTarget = ref<HTMLElement>()

// 获取全局属性
const { proxy } = getCurrentInstance()!

const toggleLoading = () => {
  loadingRef.value = !loadingRef.value
}

const toggleCustomLoading = () => {
  customLoading.value = !customLoading.value
}

// 显示全屏加载
const showFullscreenLoading = () => {
  const instance = proxy!.$loading.show({
    text: '加载中...'
  })
  
  setTimeout(() => {
    instance.close()
  }, 3000)
}

// 显示区域加载
const showTargetLoading = () => {
  if (loadingTarget.value) {
    const instance = proxy!.$loading.show({
      text: '加载中...'
    }, loadingTarget.value)
    
    setTimeout(() => {
      instance.close()
    }, 3000)
  }
}

// 显示自定义加载
const showCustomLoading = () => {
  const instance = proxy!.$loading.show({
    text: '处理中...',
    loadingColor: '#f44336',
    textColor: '#f44336',
    size: 48
  })
  
  // 2秒后更新配置
  setTimeout(() => {
    instance.updateConfig({
      text: '即将完成...',
      loadingColor: '#4caf50',
      textColor: '#4caf50'
    })
  }, 2000)
  
  // 4秒后关闭
  setTimeout(() => {
    instance.close()
  }, 4000)
}
</script>

<style>
.demo {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section h2 {
  margin: 0;
  font-size: 18px;
  color: #323233;
}

.card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card h3 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #969799;
}

button {
  margin-top: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #1989fa;
  color: white;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
