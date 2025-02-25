import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import './PullUpLoad.css'

export interface PullUpLoadProps {
  loading?: boolean
  finished?: boolean
  threshold?: number
  loadingText?: string
  finishedText?: string
  onLoad?: () => void
}

export default defineComponent({
  name: 'PullUpLoad',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    threshold: {
      type: Number,
      default: 200
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    }
  },
  emits: ['load'],
  setup(props, { slots, emit }) {
    const root = ref<HTMLDivElement>()
    let touching = false
    
    // 检查是否需要加载更多
    const check = () => {
      if (root.value && !touching) {
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const clientHeight = window.innerHeight || document.documentElement.clientHeight
        
        if (scrollHeight - scrollTop - clientHeight < props.threshold) {
          if (!props.loading && !props.finished) {
            emit('load')
          }
        }
      }
    }

    // 节流函数
    const throttle = (fn: Function, delay: number) => {
      let timer: ReturnType<typeof setTimeout> | null = null
      return function() {
        if (!timer) {
          timer = setTimeout(() => {
            fn()
            timer = null
          }, delay)
        }
      }
    }

    const throttledCheck = throttle(check, 200)

    // 触摸事件处理
    const onTouchStart = () => {
      touching = true
    }

    const onTouchEnd = () => {
      touching = false
      check()
    }

    onMounted(() => {
      document.addEventListener('scroll', throttledCheck)
      if ('ontouchstart' in window) {
        document.addEventListener('touchstart', onTouchStart)
        document.addEventListener('touchend', onTouchEnd)
      }
    })

    onBeforeUnmount(() => {
      document.removeEventListener('scroll', throttledCheck)
      if ('ontouchstart' in window) {
        document.removeEventListener('touchstart', onTouchStart)
        document.removeEventListener('touchend', onTouchEnd)
      }
    })

    return () => (
      <div ref={root} class="pull-up-load">
        {/* 内容插槽 */}
        {slots.default?.()}
        
        {/* 加载状态 */}
        <div class="pull-up-load__loading">
          {props.loading && (
            <div class="loading">
              <span class="loading-icon"></span>
              <span class="loading-text">{props.loadingText}</span>
            </div>
          )}
          {props.finished && <div class="finished">{props.finishedText}</div>}
        </div>
      </div>
    )
  }
}) 