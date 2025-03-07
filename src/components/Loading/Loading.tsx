import { defineComponent, computed } from 'vue'
import type { LoadingProps } from './types'
import CircleLoading from './components/CircleLoading.vue'

// 为每个加载组件定义具体的 props 类型
type CircleLoadingProps = {
  color?: string
  size?: number | string
  dotColor?: string
}

type SpinLoadingProps = {
  color?: string
  size?: number | string
  duration?: number
}

export default defineComponent({
  name: 'Loading',
  props: {
    type: {
      type: String as () => LoadingProps['type'],
      default: 'circle'
    },
    size: {
      type: [Number, String],
      default: 32
    },
    text: String,
    textPosition: {
      type: String as () => LoadingProps['textPosition'],
      default: 'bottom'
    },
    textColor: {
      type: String,
      default: '#969799'
    },
    loadingColor: {
      type: String,
      default: '#1989fa'
    },
    textSize: {
      type: [Number, String],
      default: 14
    }
  },
  setup(props, { slots }) {
    // 计算容器样式
    const containerStyle = computed(() => ({
      fontSize: typeof props.textSize === 'number' ? `${props.textSize}px` : props.textSize
    }))

    // 计算图标样式
    const spinnerStyle = computed(() => ({
      width: typeof props.size === 'number' ? `${props.size}px` : props.size,
      height: typeof props.size === 'number' ? `${props.size}px` : props.size
    }))

    // 计算文字样式
    const textStyle = computed(() => ({
      color: props.textColor
    }))

    // 根据类型获取对应的组件和 props
    const getLoadingComponent = () => {
      const components = {
        circle: {
          component: CircleLoading,
          props: {
            color: props.loadingColor,
            size: props.size,
            dotColor: '#dfdfdf'
          } as CircleLoadingProps
        },
        spin: {
          component: null,
          props: {
            color: props.loadingColor,
            size: props.size,
            duration: 0.8
          } as SpinLoadingProps
        }
      }

      return components[props.type]
    }

    return () => {
      const { component: LoadingComponent, props: loadingProps } = getLoadingComponent()

      return (
        <div
          class={[
            'y-loading',
            `y-loading--${props.textPosition}`
          ]}
          style={containerStyle.value}
        >
          {/* 加载图标区域 */}
          <div class="y-loading__spinner" style={spinnerStyle.value}>
            {slots.icon ? (
              <div class="y-loading__custom-icon" style={spinnerStyle.value}>
                {slots.icon()}
              </div>
            ) : (
              <LoadingComponent {...loadingProps} />
            )}
          </div>

          {/* 文字区域 */}
          {props.text && (
            <div class="y-loading__text" style={textStyle.value}>
              {slots.text ? slots.text() : props.text}
            </div>
          )}
        </div>
      )
    }
  }
}) 