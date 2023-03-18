import jsonp from "@/utils/jsonp";
import { assert } from "chai";
import { ref } from "vue";
import 'echarts/extension/bmap/bmap';
function useBMap() {
  const isReady = ref(false);
  const requestMap = async (ak = '', version = 2.0) => {
    assert(ak !== '', 'ak不能为空');
    const url = `${location.protocol}//api.map.baidu.com/getscript?v=${version}&ak=${ak}&services=&t=${Date.now()}`;
    const result = await jsonp('bmap', url);
    if (result === 'ok') {
      isReady.value = true;
    }
  };
  return { isReady, requestMap };
}
export default useBMap;
