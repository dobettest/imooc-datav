<template>
  <div class="common-card">
    <div class="title">
      {{ title }}
    </div>
    <div class="value">
      {{ value }}
    </div>
    <div class="chart">
      <slot />
    </div>
    <div class="line" />
    <div class="total">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CommonCard',
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String],
      default: 0
    },
  },
})
</script>

<style lang="scss" scoped>
.title {
  font-size: 12px;
  color: #999;
}

.value {
  font-size: 25px;
  color: #000;
  margin-top: 5px;
  letter-spacing: 1px;
}

.chart {
  height: 50px;
}

.line {
  margin: 10px 0;
  border-top: 1px solid #eee;
}

.total {
  font-size: 12px;
  color: #666;
}

:deep() {
  .emphasis {
    color: #333;
    margin-left: 5px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .increase::after {
    content: ' ';
    height: 100%;
    border-width: 3px;
    border-color: transparent transparent purple transparent;
    border-style: solid;
    margin: 0 0 3px 5px;
  }

  .decrease::after {
    content: ' ';
    border-width: 3px;
    border-color: green transparent transparent transparent;
    border-style: solid;
    margin: 3px 0 0 5px;
  }
}</style>
