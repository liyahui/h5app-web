// 编辑器视口宽高
export const VIEWPORT_WIDTH = 320
export const VIEWPORT_HEIGHT = 504
export const dev = process.env === 'development'

// 自动增加 px 的 css 属性
export const autoPX = ['width', 'height', 'top', 'left', 'fontSize', 'borderRadius', 'borderWidth', 'minHeight']

// 默认页面name
export const PAGE_NAME = '页面'

// 默认组件name
export const widgetNames = {
  TEXT: '文本',
  IMAGE: '图片'
}

// 获取小数点位数
export const getPrecision = num => {
  let str = num.toString()
  let pos = str.indexOf('.') + 1
  return pos > 0 ? str.length - pos : 0
}

// 设置小数点位数
export const setPrecision = (num, precision = 0) => {
  return parseFloat(Number(num).toFixed(precision))
}

// 是否定义
const undefinedValue = void 0
export const isDefined = value => value !== undefinedValue

export const isObject = o => typeof o === 'object' && o !== null

// 等比例缩放
export const sizeScale = ({ width, height }) => {
	const maxWidth = VIEWPORT_WIDTH / 2
	const maxHeight = VIEWPORT_HEIGHT / 2
  const size = { width, height }

  if (maxWidth < width) {
    size.width = maxWidth
  }

  if (maxHeight < height) {
    size.height = maxHeight
  }

  if (width * size.width > height * size.height) {
    size.height = parseInt(height * size.width / width)
  } else {
    size.width = parseInt(width * size.height / height)
  }
  
  return size
}

export const API_PATH = dev ? 'http://localhost:8888' : 'http://liyahui.cn:8888'
export const PREVIEW_PATH = dev ? 'http://localhost:8080' : 'http://liyahui.cn/h5app/show'