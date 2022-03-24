<template>
  <common-card
    title="累计用户数"
    :value="userToday"
  >
    <template>
      <v-chart :option="initOption()"></v-chart>
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis increase">{{userGrowthLastDay}}</span>
        <span class="month">月同比</span>
        <span class="emphasis decrease">{{userGrowthLastMonth}}</span>
      </div>
    </template>
  </common-card>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import { wrapperNumber } from '@/utils/wrapper'
export default {
  name: 'TotalUsers',
  mixins: [commonCardMixin],
  inject: ['screenData'],
  methods: {
    initOption () {
      return {
        xAxis: {
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        series: [
          {
            name: '上月平台用户数',
            type: 'bar',
            data: [this.userGrowthLastDay],
            stack: '总量',
            barWidth: 10,
            itemStyle: {
              color: '#45c946',
              background: '#eee'
            }
          },
          {
            name: '今日平台用户数',
            type: 'bar',
            data: [this.userGrowthLastMonth],
            stack: '总量',
            barWidth: 10,
            itemStyle: {
              color: '#eee'
            }
          },
          {
            type: 'custom',
            stack: '总量',
            data: [this.userGrowthLastDay],
            renderItem: function (_params, api) {
              console.log('params')
              const value = api.value(0)
              const endPoint = api.coord([value, 0])
              return {
                type: 'group',
                position: endPoint,
                children: [
                  {
                    type: 'path',
                    shape: {
                      d: 'M524.096 753.088l342.912-395.584a16 16 0 0 0-12.032-26.496H169.024a16 16 0 0 0-12.032 26.496l343.04 395.52a16 16 0 0 0 24.064 0z',
                      x: -5,
                      y: -20,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#45c946'
                    }
                  },
                  {
                    type: 'path',
                    shape: {
                      d: 'M499.904 270.912l-342.912 395.584a16 16 0 0 0 12.032 26.496H855.04a16 16 0 0 0 12.032-26.496l-342.912-395.52a16 16 0 0 0-24.192 0z',
                      x: -5,
                      y: 10,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#45c946'
                    }
                  }
                ]
              }
            }
          }
        ],
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }
    }
  },
  computed: {
    reportData () {
      return this.screenData()
    },
    userToday () {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userGrowthLastDay () {
      return wrapperNumber(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth () {
      return wrapperNumber(this.reportData, 'userGrowthLastMonth')
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 12px;
}
.total-users-footer {
  display: flex;
  align-items: center;
}
.month {
  margin-left: 5px;
}
</style>
