<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template #header>
          <div class="title-wrapper">
            关键词搜索
          </div>
        </template>
        <div class="chart-wrapper">
          <div class="chart-inner">
            <div class="chart">
              <div class="chart-title">
                搜索用户数
              </div>
              <div class="chart-data">
                93,634
              </div>
              <div
                ref="searchUserChart"
                class="echarts"
              />
            </div>
            <div class="chart">
              <div class="chart-title">
                搜索量
              </div>
              <div class="chart-data">
                198,782
              </div>
              <div
                ref="searchNumChart"
                class="echarts"
              />
            </div>
          </div>
          <div class="table-wrapper">
            <el-table
              :data="tableData"
              row-key="id"
            >
              <el-table-column
                prop="rank"
                label="排名"
                width="180"
              />
              <el-table-column
                prop="keywords"
                label="关键词"
                width="180"
              />
              <el-table-column
                prop="count"
                label="总搜索量"
              />
              <el-table-column
                prop="users"
                label="搜索用户数"
              />
            </el-table>
            <el-pagination
              layout="prev,pager,next"
              :page-size="4"
              :total="totalData.length"
              background
              @current-change="renderTable"
            />
          </div>
        </div>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template #header>
          <div class="title-wrapper">
            <div class="title">
              分类销售排行
            </div>
            <div class="radio-wrapper">
              <el-radio-group
                v-model="radioSelect"
                @change="onCategoryChange"
              >
                <el-radio-button label="category.data1">
                  品类
                </el-radio-button>
                <el-radio-button label="category.data2">
                  商品
                </el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <div class="chart-wrapper">
          <div
            ref="categoryChart"
            style="height: 100%"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref, watch, Ref } from 'vue'
import { wrapperObject } from '@/utils/wrapper'
import useChart from '@/hooks/useChart';
const colors = [
  '#8d7fec',
  '#5085f2',
  '#f8726b',
  '#e7e702',
  '#78f283',
  '#4bc1fc',
]
export default defineComponent({
  name: 'BottomView',
  setup() {
    const radioSelect = ref('category.data1');
    const pageSize = ref(4);
    const pageNum = ref(1);
    const wordCloudData = inject<Ref>('wordCloudData');
    const screenData = inject<Ref>('screenData');
    const category = computed(() => wrapperObject(screenData?.value, radioSelect.value))
    const totalData = computed(() => wordCloudData?.value?.map((item: any, index: number) => {
      return {
        id: index + 1,
        rank: index + 1,
        keywords: item.word,
        count: item.count,
        users: item.user,
        range: `${((item.user / item.count) * 100).toFixed(2)}%`,
      }
    }))
    const tableData = computed(() => totalData.value?.slice(
      (pageNum.value - 1) * pageSize.value,
      pageNum.value * pageSize.value
    ));
    const renderTable = (page: number) => pageNum.value = page;
    const onCategoryChange = (type: string) => {
      radioSelect.value = type
    };
    const createOption = (key: string) => {
      const { data, axis } = wordCloudData?.value?.reduce(
        ({ data, axis }: any, item: any) => {
          return {
            data: data.concat(item[key]),
            axis: axis.concat(item[key]),
          }
        },
        { data: [], axis: [] }
      )
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: axis,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: 'line',
            data,
            areaStyle: {
              color: 'rgba(95,187,255,.5)',
            },
            lineStyle: {
              color: 'rgb(95,187,255)',
            },
            itemStyle: {
              opacity: 0,
            },
            smooth: true,
          },
        ],
        grid: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
      }
    };
    const searchUserOption = computed(() => createOption('user'));
    const { chart: searchUserChart, setOption: renderUserChart } = useChart();
    watch(searchUserOption, renderUserChart);
    const searchNumOption = computed(() => createOption('count'));
    const { chart: searchNumChart, setOption: renderSearchNum } = useChart();
    watch(searchNumOption, renderSearchNum);
    const { chart: categoryChart, setOption: renderCategory } = useChart();
    const categoryOption = computed(() => {
      if (!category.value.data1) {
        return
      }
      let data;
      let axis: any = [];
      let total = 0
      data = category.value.data1.slice(0, 6)
      axis = category.value.axisX.slice(0, 6)
      total = data.reduce((s: number, i: number) => s + i)
      const chartData = data.map((item: any, index: number) => {
        const percent = `${((item / total) * 100).toFixed(2)}%`
        return {
          legendname: axis[index],
          value: item,
          percent,
          itemStyle: {
            color: colors[index],
          },
          name: `${axis[index]} | ${percent}`,
        }
      })
      const text = radioSelect.value === 'category.data1' ? '品类' : '商品';
      return {
        title: [
          {
            text: `${text}分布`,
            textStyle: {
              fontSize: 14,
              color: '#666',
            },
            left: 20,
            top: 20,
          },
          {
            text: '累计订单量',
            subtext: total,
            x: '34.5%',
            y: '42.5%',
            textStyle: {
              fontSize: 14,
              color: '#999',
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333',
            },
            textAlign: 'center',
          },
        ],
        series: [
          {
            name: '品类分布',
            type: 'pie',
            data: chartData,
            label: {
              normal: {
                show: true,
                position: 'outter',
                formatter: function (params: any) {
                  return params.data.legendname
                },
              },
            },
            center: ['35%', '50%'],
            radius: ['45%', '60%'],
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true,
              },
            },
            clockwise: false,
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff',
            },
          },
        ],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return (
              params.seriesName +
              '<br />' +
              params.marker +
              params.data.legendname +
              '<br />' +
              '数量：' +
              params.data.value +
              '<br />' +
              '占比：' +
              params.data.percent +
              '%'
            )
          },
        },
      }
    });
    watch(categoryOption, renderCategory)
    return {
      renderTable,
      radioSelect,
      tableData,
      onCategoryChange,
      totalData,
      searchUserChart,
      searchNumChart,
      categoryChart
    }
  }
})
</script>

<style lang="scss" scoped>
.bottom-view {
  display: grid;
  margin-top: 20px;
  grid-template-columns: 50% 1fr;
  gap: 10px;

  .view {
    box-sizing: border-box;

    &:first-child {
      padding: 0 10px 0 0;
    }

    .title-wrapper {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: 500;
      padding: 0 0 0 20px;

      .radio-wrapper {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }

    .chart-wrapper {
      height: 452px;
      display: flex;
      flex-direction: column;

      .chart-inner {
        display: flex;
        padding: 0 10px;
        margin-top: 20px;

        .chart-title {
          color: #999;
          font-size: 14px;
        }

        .chart-data {
          font-size: 22px;
          color: #333;
          letter-spacing: 2px;
          font-weight: 500;
        }

        .chart {
          flex: 1;
          padding: 0 10px;
        }

        .echarts {
          height: 50px;
        }
      }

      .table-wrapper {
        flex: 1;
        margin-top: 20px;
        padding: 0 20px 20px 20px;

        .el-pagination {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
