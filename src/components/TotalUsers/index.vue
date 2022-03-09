<template>
  <common-card title="累计用户数" value="1,064,533">
      <template>
          <div class="compare"></div>
      </template>
      <template v-slot:footer>
          <span>日同比</span>
          <span class="rate">6.36%</span>
      </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
export default {
  name: 'TotalUsers',
  mixins: [commonCardMixin]
}
</script>

<style lang="scss" scoped>
span{
    font-size: 12px;
}
.compare{
    background-color: orange;
    height: 100%;
}
.rate{
    margin-left: 5px;
    color: #333;
    font-weight: 700;
}
</style>
