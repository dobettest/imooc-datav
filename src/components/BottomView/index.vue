<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">93,634</div>
                <v-chart :option="searchUserOption"></v-chart>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">198,782</div>
                <v-chart :option="searchNumOption"></v-chart>
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
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect" @change="onCategoryChange">
                <el-radio-button label="品类"></el-radio-button>
                <el-radio-button label="商品"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :option="categoryOption"></v-chart>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import { wrapperObject } from '@/utils/wrapper'
const colors = [
  '#8d7fec',
  '#5085f2',
  '#f8726b',
  '#e7e702',
  '#78f283',
  '#4bc1fc'
]
export default {
  name: 'BottomView',
  data () {
    return {
      radioSelect: '品类',
      categoryOption: {},
      pageSize: 4,
      pageNum: 1
    }
  },
  inject: ['wordCloudData', 'screenData'],
  computed: {
    reportData () {
      return this.screenData()
    },
    category1 () {
      return wrapperObject(this.reportData, 'category.data1')
    },
    category2 () {
      return wrapperObject(this.reportData, 'category.data2')
    },
    rawData () {
      const data = this.wordCloudData()
      return Array.isArray(data) ? data : []
    },
    totalData () {
      return this.rawData.map((item, index) => {
        return {
          id: index + 1,
          rank: index + 1,
          keywords: item.word,
          count: item.count,
          users: item.user,
          range: `${((item.user / item.count) * 100).toFixed(2)}%`
        }
      })
    },
    tableData () {
      const { pageNum } = this
      return this.totalData.slice(
        (pageNum - 1) * this.pageSize,
        (pageNum - 1) * this.pageSize + this.pageSize
      )
    },
    searchUserOption () {
      return this.createOption('user')
    },
    searchNumOption () {
      return this.createOption('count')
    }
  },
  methods: {
    onCategoryChange (type) {
      this.radioSelect = type
      this.renderPieChart()
    },
    createOption (key) {
      const { data, axis } = this.rawData.reduce(
        ({ data, axis }, item) => {
          return {
            data: data.concat(item[key]),
            axis: axis.concat(item[key])
          }
        },
        { data: [], axis: [] }
      )
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: axis
        },
        yAxis: {
          show: false
        },
        tooltip: {},
        series: [
          {
            type: 'line',
            data,
            areaStyle: {
              color: 'rgba(95,187,255,.5)'
            },
            lineStyle: {
              color: 'rgb(95,187,255)'
            },
            itemStyle: {
              opacity: 0
            },
            smooth: true
          }
        ],
        grid: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      }
    },
    renderTable (page) {
      this.pageNum = page
    },
    renderPieChart () {
      if (!this.category1.data1 || !this.category2.data1) {
        return
      }
      let data
      let axis
      let total = 0
      if (this.radioSelect === '品类') {
        data = this.category1.data1.slice(0, 6)
        axis = this.category1.axisX.slice(0, 6)
        total = data.reduce((s, i) => s + i, 0)
      } else {
        data = this.category2.data1.slice(0, 6)
        axis = this.category2.axisX.slice(0, 6)
        total = data.reduce((s, i) => s + i, 0)
      }
      const chartData = []
      data.forEach((item, index) => {
        const percent = `${((item / total) * 100).toFixed(2)}%`
        chartData.push({
          legendname: axis[index],
          value: item,
          percent,
          itemStyle: {
            color: colors[index]
          },
          name: `${axis[index]} | ${percent}`
        })
      })
      this.categoryOption = {
        title: [
          {
            text: `${this.radioSelect}分布`,
            textStyle: {
              fontSize: 14,
              color: '#666'
            },
            left: 20,
            top: 20
          },
          {
            text: '累计订单量',
            subtext: total,
            x: '34.5%',
            y: '42.5%',
            textStyle: {
              fontSize: 14,
              color: '#999'
            },
            subtextStyle: {
              fontSize: 28,
              color: '#333'
            },
            textAlign: 'center'
          }
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
                formatter: function (params) {
                  return params.data.legendname
                }
              }
            },
            center: ['35%', '50%'],
            radius: ['45%', '60%'],
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true
              }
            },
            clockwise: false,
            itemStyle: {
              borderWidth: 4,
              borderColor: '#fff'
            }
          }
        ],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
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
          }
        }
      }
    }
  },
  watch: {
    category1 (nl, ol) {
      this.renderPieChart()
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-view {
  display: flex;
  margin-top: 20px;
  .view {
    flex: 1;
    box-sizing: border-box;
    width: 50%;
    &:first-child {
      padding: 0 10px 0 0;
    }
    &:last-child {
      padding: 0 0 0 10px;
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
