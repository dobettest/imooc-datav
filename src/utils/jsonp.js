export default function jsonp(moduleId, src, callback) {
  return new Promise(function (resolve, reject) {
    const dom = document.getElementById(moduleId);
    if (dom) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.src = src;
      script.id = moduleId;
      document.head.appendChild(script);
      script.onload = function () {
        if (Object.prototype.toString.call(callback) === "[object Function]") {
          callback();
        }
        resolve();
      };
      script.onerror = function () {
        reject(new Error("异步请求失败"));
      };
    }
  });
}
