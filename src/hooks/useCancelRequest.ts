/**
 * @descrption 用于取消上一个请求操作的hook
 */
import { assert } from "@vue/compiler-core";
import { ref, type Ref } from "vue";
const useCancelRequest = function () {
  let controller: Ref<AbortController | null> = ref(null);
  const request = (cb: Function):any => {
    assert(typeof cb === 'function', 'callback must be a function');
    controller.value?.abort();
    controller.value = new AbortController();
    return cb(controller.value.signal);
  };
  return { request };
};
export default useCancelRequest;
