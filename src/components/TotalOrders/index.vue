<template>
  <common-card
    title="累计订单量"
    :value="orderToday"
  >
    <template>
      <div
        ref="chartDom"
        class="echarts"
      ></div>
    </template>
    <template v-slot:footer>
      <span>昨日订单量</span>
      <span class="order">{{orderLastDay}}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import { wrapperNumber } from '@/utils/wrapper'
export default {
  name: 'TotalOrders',
  mixins: [commonCardMixin],
  inject: ['screenData'],
  computed: {
    reportData () {
      return this.screenData()
    },
    orderToday () {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay () {
      return wrapperNumber(this.reportData, 'orderLastDay')
    }
  },
  mounted () {
    const chart = this.$echarts.init(this.$refs.chartDom)
    chart.setOption({
      xAxis: {
        type: 'category',
        show: false,
        boundaryGap: false
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          data: [
            620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530,
            220, 620
          ],
          smooth: true,
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: 'purple'
          },
          itemStyle: {
            opacity: 0
          }
        }
      ],
      grid: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    })
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 12px;
}
.order {
  color: #333;
  font-weight: 700;
  margin-left: 5px;
}
</style>
