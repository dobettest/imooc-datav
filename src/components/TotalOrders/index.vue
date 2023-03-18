<template>
  <common-card
    title="累计订单量"
    :value="orderToday"
  >
    <div
      ref="chart"
      style="height:100%;"
    />
    <template #footer>
      <span>昨日订单量</span>
      <span class="order">{{ orderLastDay }}</span>
    </template>
  </common-card>
</template>

<script lang="ts">
import { defineComponent, inject, computed, watch, type Ref } from 'vue';
import { wrapperNumber } from '@/utils/wrapper';
import useChart from '@/hooks/useChart';
import CommonCard from '@/components/CommonCard/index.vue';
const options = {
  xAxis: {
    type: 'category',
    show: false,
    boundaryGap: false,
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      type: 'line',
      data: [
        620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530,
        220, 620,
      ],
      smooth: true,
      lineStyle: {
        width: 0,
      },
      areaStyle: {
        color: 'purple',
      },
      itemStyle: {
        opacity: 0,
      },
    },
  ],
  grid: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
};
export default defineComponent({
  name: 'TotalOrders',
  components:{CommonCard},
  setup() {
    const screenData = inject<Ref>('screenData');
    const orderToday = computed(() => wrapperNumber(screenData?.value, 'orderToday'));
    const orderLastDay = computed(() => wrapperNumber(screenData?.value, 'orderLastDay'));
    const { chart, setOption } = useChart();
    watch(chart, () => setOption(options));
    return {
      chart,
      orderToday,
      orderLastDay
    };
  },
});
</script>

<style lang="scss">
span {
  font-size: 12px;
}

.order {
  color: #333;
  font-weight: 700;
  margin-left: 5px;
}
</style>
