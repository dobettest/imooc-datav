<template>
  <common-card
    title="今日交易用户数"
    value="59,648"
  >
    <div
      ref="chart"
      style="height: 100%;"
    />
    <template #footer>
      <span>退货率</span>
      <span class="unorder__rate">5.82</span>
    </template>
  </common-card>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import CommonCard from '@/components/CommonCard/index.vue'
import useChart from '@/hooks/useChart';
const chartOption = {
  xAxis: {
    show: false,
    type: 'category',
    data: [
      '0:00',
      '1:00',
      '2:00',
      '3:00',
      '4:00',
      '5:00',
      '6:00',
      '7:00',
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
    ],
  },
  tooltip: {
    formatter: '直接访问{c}',
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      type: 'bar',
      data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330],
      barWidth: '60%',
    },
  ],
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}
export default defineComponent({
  name: 'TodayUsers',
  components:{CommonCard},
  setup() {
    const { chart, setOption } = useChart();
    watch(chart, () => { setOption(chartOption) })
    return { chart }
  },
})
</script>

<style lang="scss" scoped>
span {
  font-size: 12px;
}

.compare {
  height: 100%;
  background-color: green;
}

.unorder__rate {
  margin-left: 5px;
  color: #333;
  font-weight: 700;
}
</style>
