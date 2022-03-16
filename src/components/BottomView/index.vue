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
              <el-table :data="tableData" row-key="id">
                <el-table-column prop="rank" label="排名" width="180" />
                <el-table-column prop="keywords" label="关键词" width="180" />
                <el-table-column prop="count" label="总搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
              </el-table>
              <el-pagination
                layout="prev,pager,next"
                :page-size="4"
                :total="100"
                background
                @current-change="onPageChange"
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
              <el-radio-group v-model="radioSelect">
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
export default {
  name: 'BottomView',
  data () {
    return {
      searchUserOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: 'line',
            data: [100, 150, 200, 250, 200, 150, 100, 50, 100, 150],
            itemStyle: {
              opacity: 0,
              smooth: true
            },
            areaStyle: {
              color: 'rgba(95, 187, 255, 0.5)'
            },
            lineStyle: {
              color: 'rgb(95, 187, 255)'
            }
          }
        ],
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      searchNumOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          show: false,
          max: 300,
          min: 0
        },
        series: [
          {
            type: 'line',
            data: [100, 150, 200, 250, 200, 150, 100, 50, 100, 150],
            itemStyle: {
              opacity: 0,
              smooth: true
            },
            areaStyle: {
              color: 'rgba(95, 187, 255, 0.5)'
            },
            lineStyle: {
              color: 'rgb(95, 187, 255)'
            }
          }
        ],
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      tableData: [
        {
          id: 1,
          rank: 1,
          keywords: '北京',
          count: 100,
          users: 90,
          range: '90%'
        },
        {
          id: 2,
          rank: 2,
          keywords: '上海',
          count: 100,
          users: 90,
          range: '90%'
        },
        {
          id: 3,
          rank: 3,
          keywords: '广州',
          count: 100,
          users: 90,
          range: '90%'
        },
        {
          id: 4,
          rank: 4,
          keywords: '深圳',
          count: 100,
          users: 90,
          range: '90%'
        }
      ],
      radioSelect: '品类',
      categoryOption: {}
    }
  },
  methods: {
    onPageChange (page) {
      console.log(page)
    },
    initCategoryOption () {
      const mockData = [
        {
          legendname: '粉面粥点',
          name: '粉面粥点|30%',
          value: 30,
          percent: '30',
          itemStyle: {
            color: '#5085f2'
          }
        },
        {
          legendname: '粉面粥点',
          name: '简餐便当|30%',
          value: 20,
          percent: '20',
          itemStyle: {
            color: '#e7e702'
          }
        },
        {
          legendname: '粉面粥点',
          name: '汉堡披萨|50%',
          value: 50,
          percent: '50',
          itemStyle: {
            color: '#8d7fec'
          }
        }
      ]
      this.categoryOption = {
        title: [
          {
            text: '品类分布',
            textStyle: {
              color: '#666',
              fontSize: 14
            },
            left: 20,
            top: 20
          },
          {
            text: '累计订单量',
            textStyle: {
              color: '#999',
              fontSize: 14
            },
            subtext: '320',
            subtextStyle: {
              color: '#333',
              fontSize: 28
            },
            x: '34,5%',
            y: '42.5%',
            textAlign: 'center'
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
          formatter: function (params) {
            const {
              data: { legendname, value, percent },
              marker
            } = params
            return (
              marker +
              legendname +
              '<br/>' +
              `数量: ${value}` +
              '<br/>' +
              `占比: ${percent}%`
            )
          }
        },
        series: [
          {
            type: 'pie',
            data: mockData,
            label: {
              formatter: function (params) {
                console.log(params)
                const { name } = params.data
                return `${name}`
              }
            },
            center: ['35%', '50%'],
            radius: ['45%', '60%'],
            labelLine: {
              length: 5,
              length2: 3,
              smooth: true
            },
            itemStyle: {
              // 环形中间空白效果
              borderWidth: 4,
              borderColor: '#fff'
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.initCategoryOption()
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
