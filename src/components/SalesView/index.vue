<template>
  <el-card
    shadow="hover"
    class="sales-view"
  >
    <template #header>
      <div class="menu-wrapper">
        <el-menu
          mode="horizontal"
          :default-active="activeIndex"
          class="sales-view-menu"
          @select="onSelect"
        >
          <el-menu-item index="orderFullYear">
            销售额
          </el-menu-item>
          <el-menu-item index="userFullYear">
            访问量
          </el-menu-item>
        </el-menu>
        <div class="menu-right">
          <el-radio-group v-model="radioValue">
            <el-radio-button label="今日" />
            <el-radio-button label="本周" />
            <el-radio-button label="本月" />
            <el-radio-button label="今年" />
          </el-radio-group>
          <div class="sales-view-date-picker">
            <el-date-picker
              v-model="date"
              :popper-options="{ placement: 'bottom-end' }"
              :shortcuts="shortcuts"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :unlink-panels="true"
            />
          </div>
        </div>
      </div>
    </template>
    <div class="sales-view-chart-wrapper">
      <div
        ref="chart"
        class="echarts"
      />
      <div class="sales-view-list">
        <div class="sales-view-title">
          排行榜
        </div>
        <div class="list-item-wrapper">
          <div
            v-for="item in rankData"
            :key="item.no"
            class="list-item"
          >
            <div class="list-item-no">
              {{ item.no }}
            </div>
            <div class="list-item-name">
              {{ item.name }}
            </div>
            <div class="list-item-money">
              {{ item.money }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, watch, type Ref } from 'vue';
import { wrapperArray } from '@/utils/wrapper';
import useChart from '@/hooks/useChart';
export default defineComponent({
  name: 'SalesView',
  setup() {
    const activeIndex = ref('orderFullYear');
    const radioValue = ref('今日');
    const date = ref(null);
    const shortcuts = [
      {
        text: '最近一周',
        value() {
          const start = new Date();
          const end = new Date();
          start.setTime(start.getTime() - 3600 * 24 * 1000 * 7);
          return [start, end];
        },
      },
      {
        text: '最近一个月',
        value() {
          const start = new Date();
          const end = new Date();
          start.setTime(start.getTime() - 3600 * 24 * 1000 * 30);
          return [start, end];
        },
      },
      {
        text: '最近三个月',
        value() {
          const start = new Date();
          const end = new Date();
          start.setTime(start.getTime() - 3600 * 24 * 1000 * 90);
          return [start, end];
        },
      },
    ];
    const screenData = inject<Ref>('screenData');
    const orderRank = computed(() => wrapperArray(screenData?.value, 'orderRank'));
    const userRank = computed(() => wrapperArray(screenData?.value, 'userRank'));
    const rankData = computed(() => activeIndex.value === 'orderFullYear' ? orderRank.value : userRank.value);
    const onSelect = (index: string) => {
      activeIndex.value = index;
    };
    const chartOption = computed(() => {
      const text = activeIndex.value === 'orderFullYear' ? '年度销售额' : '年度用户访问量';
      const data = wrapperArray(screenData?.value, activeIndex.value);
      const axis = wrapperArray(screenData?.value, `${activeIndex.value}Axis`);
      return {
        title: {
          text,
          textStyle: {
            fontSize: 12,
            color: '#666',
          },
          left: 25,
          top: 20,
        },
        xAxis: {
          type: 'category',
          data: axis,
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: '#999',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#999',
            },
          },
          axisLabel: {
            color: '#333',
          },
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: '#eee',
            },
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: '35%',
            data,
          },
        ],
        color: ['#3398DB'],
        grid: {
          top: 70,
          left: 60,
          right: 60,
          bottom: 50,
        },
      };
    });
    const { chart, setOption } = useChart();
    watch(chartOption, setOption);
    return {
      activeIndex,
      radioValue,
      shortcuts,
      rankData,
      date,
      onSelect,
      chart
    };
  }
});
</script>

<style lang="scss" scoped>
.sales-view {
  padding: 0 0 20px 0;
  margin-top: 20px;

  .sales-view-chart-wrapper {
    display: grid;
    height: 270px;
    grid-template-columns: 70% 1fr;
    .echarts {
      height: 100%;
    }

    .sales-view-list {
      height: 100%;
      .sales-view-title {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        font-weight: 500;
      }

      .list-item-wrapper {
        margin-top: 15px;

        .list-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          height: 20px;
          padding: 6px 20px 6px 0;

          .list-item-no {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            color: #333;

            &:nth-child(-n+3){
              background-color: #000;
              border-radius: 50%;
              color: #fff;
              font-weight: 500;
            }
          }

          .list-item-name {
            margin-left: 10px;
            color: #333;
          }

          .list-item-money {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}

.menu-wrapper {
  display: flex;
  position: relative;

  .sales-view-menu {
    width: 100%;
    padding-left: 20px;

    .el-menu-item {
      height: 50px;
      line-height: 50px;
      margin: 0 20px;
    }
  }

  .menu-right {
    position: absolute;
    right: 20px;
    top: 0;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .sales-view-date-picker {
      margin-left: 20px;
    }
  }
}
</style>
