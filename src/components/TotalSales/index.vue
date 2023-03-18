<template>
  <common-card
    title="累计销售额"
    :value="salesToday"
  >
    <div class="compare-wrapper">
      <div class="compare">
        <span>日同比</span>
        <span class="emphasis increase">{{ salesGrowthLastDay }}</span>
      </div>
      <div class="compare">
        <span>月同比</span>
        <span class="emphasis decrease">{{ salesGrowthLastMonth }}</span>
      </div>
    </div>
    <template #footer>
      <div class="compare">
        <span>昨日销售额</span>
        <span class="emphasis">{{ salesLastDay }}</span>
      </div>
    </template>
  </common-card>
</template>

<script lang="ts">
import { defineComponent, computed, inject, type Ref } from 'vue';
import { wrapperMoney, wrapperPercentage } from '@/utils/wrapper';
import CommonCard from '@/components/CommonCard/index.vue';
export default defineComponent({
  name: 'TotalSales',
  components: {CommonCard},
  setup() {
    const screenData = inject<Ref>('screenData');
    const salesGrowthLastDay = computed(() => wrapperPercentage(screenData?.value, 'salesGrowthLastDay'));
    const salesGrowthLastMonth = computed(() => wrapperPercentage(screenData?.value, 'salesGrowthLastMonth'));
    const salesLastDay = computed(() => wrapperMoney(screenData?.value, 'salesLastDay'));
    const salesToday = computed(() => wrapperMoney(screenData?.value, 'salesToday'));
    return { salesGrowthLastDay, salesGrowthLastMonth, salesLastDay, salesToday };
  }
});
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
}

.compare {
  display: flex;
  align-items: center;
}
</style>
