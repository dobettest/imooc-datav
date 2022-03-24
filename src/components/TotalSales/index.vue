<template>
  <common-card
    title="累计销售额"
    :value="salesToday"
  >
    <template>
      <div class="compare-wrapper">
        <div class="compare">
          <span>日同比</span>
          <span class="emphasis increase">{{salesGrowthLastDay}}</span>
        </div>
        <div class="compare">
          <span>月同比</span>
          <span class="emphasis decrease">{{salesGrowthLastMonth}}</span>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <span>昨日销售额</span>
      <span class="money">{{salesLastDay}}</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import { wrapperMoney, wrapperPercentage } from '@/utils/wrapper'
export default {
  name: 'TotalSales',
  mixins: [commonCardMixin],
  inject: ['screenData'],
  computed: {
    reportData () {
      console.log('reportData', this.screenData())
      return this.screenData()
    },
    salesGrowthLastDay () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesGrowthLastMonth () {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
    },
    salesLastDay () {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    salesToday () {
      return wrapperMoney(this.reportData, 'salesToday')
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 12px;
}
.compare-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .compare {
    display: flex;
    align-items: center;
  }
}
</style>
