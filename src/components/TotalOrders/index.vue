<template>
    <common-card title="累计订单量" value="2,115,465">
      <template>
        <div class="compare"></div>
      </template>
      <template v-slot:footer>
        <span>昨日订单量</span>
        <span class="order">2,000,000</span>
      </template>
    </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
export default {
  name: 'TotalOrders',
  mixins: [commonCardMixin]
}
</script>

<style lang="scss" scoped>
span{
  font-size: 12px;
}
.compare{
  height: 100%;
  background-color: red;
}
.order{
  color: #333;
  font-weight: 700;
  margin-left: 5px;
}
</style>
