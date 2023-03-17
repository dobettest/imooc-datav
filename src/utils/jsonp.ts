export default function jsonp(moduleId: string, src: string, callback?: Function) {
  return new Promise(function (resolve, reject) {
    const dom = document.getElementById(moduleId)
    if (dom) {
      resolve('ok')
    } else {
      const script = document.createElement('script')
      script.src = src
      script.id = moduleId
      document.head.appendChild(script)
      script.onload = function () {
        if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
          callback()
        }
        resolve('ok')
      }
      script.onerror = function () {
        reject(new Error('异步请求失败'))
      }
    }
  })
}
