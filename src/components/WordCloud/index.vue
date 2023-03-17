<template>
  <div
    ref="chart"
    style="height: 100%"
  />
</template>

<script lang="ts">
import { defineComponent, inject, computed, watch, Ref } from 'vue'
import 'echarts-wordcloud'
import useChart from '@/hooks/useChart'
import { randomColor } from '@/utils'
export default defineComponent({
  name: 'WordCloud',
  setup() {
    const wordcloud = inject<Ref>('wordCloudData')
    const options = computed(() => {
      const data = wordcloud?.value?.map((item: any) => {
        return { name: item.word, value: item.count }
      })
      return {
        tooltip: {},
        series: [
          {
            type: 'wordCloud',
            shape: 'circle',
            textStyle: {
              color: randomColor(),
            },
            emphasis: {
              textStyle: {
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
            data: data || [],
          },
        ],
      }
    });
    const { chart, setOption } = useChart();
    watch(options, setOption);
    return { chart }
  },
})
</script>
