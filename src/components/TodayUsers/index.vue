<template>
  <common-card title="今日交易用户数" value="59,648">
    <template>
      <div class="compare"></div>
    </template>
    <template v-slot:footer>
      <span>退货率</span>
      <span class="unorder__rate">5.82</span>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
export default {
  name: 'TodayUsers',
  mixins: [commonCardMixin]
}
</script>

<style lang="scss" scoped>
span{
  font-size: 12px;
}
.compare{
  height: 100%;
  background-color: green;
}
.unorder__rate{
  margin-left: 5px;
  color: #333;
  font-weight: 700;
}
</style>
