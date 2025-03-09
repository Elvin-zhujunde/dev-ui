export type LoadingType = 'circle' | 'spin' // 可以继续扩展其他类型
export type TextPosition = 'right' | 'bottom'

export interface LoadingProps {
  // 基础配置
  type?: LoadingType
  size?: number | string
  text?: string
  textPosition?: TextPosition
  // 样式配置
  textColor?: string
  loadingColor?: string
  textSize?: number | string
  // 自定义配置
  customIcon?: string // SVG string
} 