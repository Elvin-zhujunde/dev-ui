import { createApp, ref, watch } from 'vue'
import type { App } from 'vue'
import Loading from './Loading'
import type { LoadingProps } from './types'

export interface LoadingInstance {
  close: () => void
  updateConfig: (options: Partial<LoadingProps>) => void
}

class LoadingService {
  private readonly instances: Map<HTMLElement, LoadingInstance> = new Map()
  private readonly defaultConfig: Readonly<Partial<LoadingProps>> = {
    type: 'circle',
    size: 32,
    textPosition: 'bottom',
    textColor: '#969799',
    loadingColor: '#1989fa',
  }

  // 清理资源
  private cleanup(target: HTMLElement) {
    const instance = this.instances.get(target)
    if (instance) {
      instance.close()
      this.instances.delete(target)
    }
  }

  // 创建 loading 实例
  create(options: Partial<LoadingProps> = {}, target?: HTMLElement): LoadingInstance {
    const mountTarget = target || document.body
    
    // 清理已存在的实例
    this.cleanup(mountTarget)

    try {
      // 获取挂载目标
      const mountTarget = target || document.body
      
      // 防止重复创建
      if (this.instances.has(mountTarget)) {
        console.warn('Loading instance already exists for this target')
        return this.instances.get(mountTarget)!
      }

      // 创建容器
      const container = document.createElement('div')
      container.className = 'y-loading-container'
      
      // 如果目标元素是 body，添加全屏样式
      if (mountTarget === document.body) {
        container.className += ' y-loading-fullscreen'
      }
      
      // 创建响应式配置
      const config = ref({
        ...this.defaultConfig,
        ...options,
      })
      
      // 创建 Vue 应用实例
      const loadingApp = createApp(Loading, {
        ...config.value,
        class: 'y-loading-mask'
      })
      
      // 挂载应用
      mountTarget.appendChild(container)
      loadingApp.mount(container)
      
      // 设置目标元素样式
      if (mountTarget !== document.body && 
          window.getComputedStyle(mountTarget).position === 'static') {
        mountTarget.style.position = 'relative'
      }
      
      // 创建实例对象
      const instance: LoadingInstance = {
        close: () => {
          loadingApp.unmount()
          container.remove()
          this.instances.delete(mountTarget)
        },
        updateConfig: (newOptions: Partial<LoadingProps>) => {
          Object.assign(config.value, newOptions)
        }
      }
      
      // 保存实例
      this.instances.set(mountTarget, instance)
      
      // 添加错误处理
      const errorHandler = (err: Error) => {
        console.error('Loading error:', err)
        instance.close()
      }

      loadingApp.config.errorHandler = errorHandler

      // 自动清理
      if (options.duration) {
        setTimeout(() => {
          this.cleanup(mountTarget)
        }, options.duration)
      }

      return instance
    } catch (err) {
      console.error('Failed to create loading instance:', err)
      throw err
    }
  }
  
  // 关闭指定目标的 loading
  close(target?: HTMLElement) {
    const mountTarget = target || document.body
    const instance = this.instances.get(mountTarget)
    if (instance) {
      instance.close()
    }
  }
  
  // 关闭所有 loading
  closeAll() {
    this.instances.forEach(instance => instance.close())
    this.instances.clear()
  }

  // 更新配置
  setDefaultConfig(config: Partial<LoadingProps>) {
    Object.assign(this.defaultConfig, config)
  }
}

// 创建单例
export const loadingService = new LoadingService()

// 导出便捷方法
export const loading = {
  show(options?: Partial<LoadingProps>, target?: HTMLElement) {
    return loadingService.create(options, target)
  },
  close(target?: HTMLElement) {
    loadingService.close(target)
  },
  closeAll() {
    loadingService.closeAll()
  },
  setDefaultConfig(config: Partial<LoadingProps>) {
    loadingService.setDefaultConfig(config)
  }
} 