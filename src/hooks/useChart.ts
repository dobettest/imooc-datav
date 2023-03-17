import { ref, onMounted, onBeforeUnmount, shallowRef, toRaw } from 'vue';
import { ECharts, init } from 'echarts';
import { debounce } from 'lodash-es'
export default function useChart() {
  const chart = ref<HTMLElement | null>(null);
  const instance = shallowRef<ECharts | null>();
  const resize = debounce(() => {
    instance.value?.resize()
  }, 200)
  const setOption = (options: any) => {
    instance.value?.setOption(options)
  }
  onMounted(() => {
    console.log('onMounted')
    if (chart.value) {
      instance.value = init(chart.value);
    }
    window.addEventListener('resize', resize)
  });
  onBeforeUnmount(() => {
    console.log('onunMounted')
    window.removeEventListener('resize', resize)
    instance.value?.dispose();
    instance.value = null;
  })
  return { chart, resize, setOption, instance };
}
