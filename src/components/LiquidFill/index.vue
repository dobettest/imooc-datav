<template>
  <div
    ref="chart"
    style="height: 100%"
  />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import 'echarts-liquidfill'
import useChart from '@/hooks/useChart';
export default defineComponent({
  name: 'LiquidFill',
  setup() {
    const options = {
      series: [
        {
          type: 'liquidFill',
          radius: '80%',
          data: [0.6],
          label: {
            formatter: (v: any) => {
              return `${(v.data * 100).toFixed(2)}%`
            },
            textStyle: {
              fontSize: 36,
              color: '#999',
              fontWeight: 'normal',
            },
            position: ['50%', '50%'],
            insideColor: '#fff',
          },
          outline: {
            itemStyle: {
              borderColor: '#aaa4a4',
              borderWidth: 1,
              color: 'none',
              shadowBlur: 0,
              shadowColor: '#fff',
            },
            borderDistance: 0,
          },
          backgroundStyle: {
            color: '#fff',
          },
          itemStyle: {
            shadowBlur: 0,
            shadowColor: '#fff',
          },
          amplitude: 8,
          color: ['purple'],
        },
      ]
    }
    const { chart, setOption } = useChart();
    watch(chart, () => {
      if (chart.value) {
        setOption(options)
      }
    });
    return {
      chart
    }
  }
})
</script>
