import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import './PullUpLoad.css'

export interface PullUpLoadProps {
  loading?: boolean
  finished?: boolean
  threshold?: number
  loadingText?: string
  finishedText?: string
  pullText?: string
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
      default: 80 // 上拉阈值，单位为px
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    pullText: {
      type: String,
      default: '上拉加载更多'
    }
  },
  emits: ['load'],
  setup(props, { slots, emit }) {
    const root = ref<HTMLDivElement>()
    const pulling = ref(false)
    const startY = ref(0)
    const distance = ref(0)
    
    // 触摸事件处理
    const onTouchStart = (e: TouchEvent) => {
      if (props.loading || props.finished) return
      startY.value = e.touches[0].clientY
      pulling.value = true
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!pulling.value) return
      
      const currentY = e.touches[0].clientY
      // 计算向上拉动的距离
      distance.value = startY.value - currentY
      
      // 如果是向下拉，则不处理
      if (distance.value < 0) {
        distance.value = 0
        pulling.value = false
        return
      }
    }

    const onTouchEnd = () => {
      if (!pulling.value) return
      
      // 如果达到阈值，触发加载
      if (distance.value >= props.threshold) {
        emit('load')
      }
      
      // 重置状态
      pulling.value = false
      distance.value = 0
    }

    onMounted(() => {
      if (root.value) {
        root.value.addEventListener('touchstart', onTouchStart)
        root.value.addEventListener('touchmove', onTouchMove)
        root.value.addEventListener('touchend', onTouchEnd)
      }
    })

    onBeforeUnmount(() => {
      if (root.value) {
        root.value.removeEventListener('touchstart', onTouchStart)
        root.value.removeEventListener('touchmove', onTouchMove)
        root.value.removeEventListener('touchend', onTouchEnd)
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
          {!props.loading && !props.finished && (
            <div class="pulling" style={{ opacity: Math.min(distance.value / props.threshold, 1) }}>
              <span class="pulling-text">
                {distance.value >= props.threshold ? '释放立即加载' : props.pullText}
              </span>
            </div>
          )}
          {props.finished && <div class="finished">{props.finishedText}</div>}
        </div>
      </div>
    )
  }
}) 