import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import './PullUpLoad.css'

export interface PullUpLoadProps {
  loading?: boolean
  finished?: boolean
  threshold?: number
  loadingText?: string
  finishedText?: string
  pullText?: string
  maxDistance?: number // 最大拉动距离
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
    maxDistance: {
      type: Number,
      default: 200 // 最大可拉动距离
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
    const contentRef = ref<HTMLDivElement>()
    const pulling = ref(false)
    const startY = ref(0)
    const distance = ref(0)
    
    // 计算阻尼效果
    const calculateDamping = (distance: number) => {
      const maxDistance = props.maxDistance
      if (distance > maxDistance) {
        return maxDistance + (distance - maxDistance) * 0.3
      }
      return distance
    }
    
    const onTouchStart = (e: TouchEvent) => {
      if (props.loading || props.finished) return
      startY.value = e.touches[0].clientY
      pulling.value = true
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!pulling.value) return
      
      const currentY = e.touches[0].clientY
      const deltaY = startY.value - currentY
      
      // 只处理上拉
      if (deltaY < 0) {
        distance.value = 0
        pulling.value = false
        return
      }

      // 应用阻尼效果
      distance.value = calculateDamping(deltaY)
      
      // 更新容器位置
      if (contentRef.value) {
        contentRef.value.style.transform = `translate3d(0, -${distance.value}px, 0)`
        contentRef.value.style.transition = 'none'
      }
    }

    const onTouchEnd = () => {
      if (!pulling.value) return
      
      if (contentRef.value) {
        contentRef.value.style.transition = 'transform 0.3s'
        contentRef.value.style.transform = 'translate3d(0, 0, 0)'
      }
      
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
        {/* 内容容器 */}
        <div ref={contentRef} class="pull-up-load__content">
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
      </div>
    )
  }
}) 