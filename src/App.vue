<template>
  <div class="demo">
    <div class="section">
      <h2>组件用法</h2>
      
      <!-- 基础用法 -->
      <div class="card">
        <h3>基础用法</h3>
        <Loading />
      </div>

      <!-- 带文字 -->
      <div class="card">
        <h3>带文字</h3>
        <Loading text="加载中..." />
      </div>

      <!-- 自定义大小和颜色 -->
      <div class="card">
        <h3>自定义样式</h3>
        <Loading 
          size="48"
          loading-color="#f44336"
          text="加载中..."
          text-color="#f44336"
        />
      </div>

      <!-- 文字在右侧 -->
      <div class="card">
        <h3>文字位置</h3>
        <Loading 
          text="加载中..."
          text-position="right"
        />
      </div>

      <!-- 自定义图标 -->
      <div class="card">
        <h3>自定义图标</h3>
        <Loading text="自定义图标">
          <template #icon>
            <svg viewBox="0 0 64 64" width="100%" height="100%">
              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="4" />
            </svg>
          </template>
        </Loading>
      </div>
    </div>

    <div class="section">
      <h2>指令用法</h2>
      
      <!-- 基础指令用法 -->
      <div class="card" v-loading="loading">
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
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import Loading, { LoadingDirective } from './components/Loading'

// 注册指令
const app = getCurrentInstance()?.appContext.app
app?.use(LoadingDirective)

const loading = ref(false)
const customLoading = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
}

const toggleCustomLoading = () => {
  customLoading.value = !customLoading.value
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
