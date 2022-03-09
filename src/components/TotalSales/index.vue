<template>
    <common-card title="累计销售额" value="¥ 32,039,165">
      <template>
        <div class="compare"></div>
      </template>
      <template v-slot:footer>
        <span>昨日销售额</span>
        <span class="money">¥ 30,000,000</span>
      </template>
    </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
export default {
  name: 'TotalSales',
  mixins: [commonCardMixin]
}
</script>

<style lang="scss" scoped>
span{
  font-size: 12px;
}
.compare{
  height: 100%;
  background-color: yellow;
}
.money{
  color:#333;
  margin-left: 5px;
  font-weight: 700;
}
</style>
