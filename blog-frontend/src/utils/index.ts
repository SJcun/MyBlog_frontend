import dayjs from 'dayjs'

/**
 * 日期格式化
 * @param date 日期
 * @param format 格式
 */
export function formatDate(date: string | number | Date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 数字格式化，如：1000 -> 1k
 * @param num 数字
 */
export function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
}

/**
 * 文本截断
 * @param text 文本
 * @param length 长度
 */
export function truncateText(text: string, length: number) {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * 获取随机颜色
 */
export function getRandomColor() {
  const colors = [
    '#3498db', '#2ecc71', '#e74c3c', 
    '#f39c12', '#9b59b6', '#1abc9c', 
    '#d35400', '#c0392b', '#2980b9'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

/**
 * 防抖函数
 * @param fn 函数
 * @param delay 延迟时间
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timer: number | null = null
  return function(this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = window.setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 函数
 * @param delay 延迟时间
 */
export function throttle<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let lastTime = 0
  return function(this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

/**
 * 复制文本到剪贴板
 * @param text 文本
 */
export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
}

/**
 * 获取URL参数
 * @param name 参数名
 */
export function getUrlParam(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

/**
 * 滚动到顶部
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/**
 * 检查设备类型
 */
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
} 