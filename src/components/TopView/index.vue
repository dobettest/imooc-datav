<template>
  <div class="top-view">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <total-sales />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-orders />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <today-users />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-users />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TotalSales from '@/components/TotalSales/index.vue'
import TotalOrders from '@/components/TotalOrders/index.vue'
import TodayUsers from '@/components/TodayUsers/index.vue'
import TotalUsers from '@/components/TotalUsers/index.vue'
export default defineComponent({
  name: 'TopView',
  components: { TotalSales, TodayUsers, TotalOrders, TotalUsers },
})
</script>
