<script setup lang="ts">
import { ref } from 'vue'
import PullUpLoad from './PullUpLoad'

const list = ref<Array<{ id: number; title: string }>>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  loading.value = true
  // 模拟异步加载数据
  setTimeout(() => {
    const lastItem = list.value[list.value.length - 1]
    const startId = (lastItem?.id || 0) + 1
    
    // 每次加载10条数据
    const items = Array(10).fill(0).map((_, index) => ({
      id: startId + index,
      title: `商品 ${startId + index}`
    }))
    
    list.value.push(...items)
    loading.value = false
    
    // 加载到50条数据就完成
    if (list.value.length >= 50) {
      finished.value = true
    }
  }, 1000)
}
onLoad()
</script>

<template>
  <div class="app">
    <header class="header">
      上拉加载示例
    </header>
    
    <PullUpLoad
      :loading="loading"
      :finished="finished"
      :threshold="80"
      loading-text="努力加载中..."
      finished-text="没有更多商品了"
      pull-text="上拉查看更多商品"
      @load="onLoad"
    >
      <div class="list">
        <div v-for="item in list" 
             :key="item.id" 
             class="list-item"
        >
          <div class="item-content">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-desc">商品描述信息 {{ item.id }}</div>
          </div>
        </div>
      </div>
    </PullUpLoad>
  </div>
</template>

<style>
/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 
               Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 
               'Microsoft Yahei', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #f7f8fa;
}

.app {
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
  font-size: 16px;
  z-index: 100;
}

.list {
  padding-top: 44px;
}

.list-item {
  background: #fff;
  margin-bottom: 10px;
}

.item-content {
  padding: 16px;
}

.item-title {
  font-size: 16px;
  color: #323233;
  margin-bottom: 8px;
}

.item-desc {
  font-size: 14px;
  color: #969799;
}
</style>
