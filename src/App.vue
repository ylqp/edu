<template>
  <div id="app">
    <h1>ylqp</h1>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <p class="text">ddddd</p>
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
}).then(res => {
  console.log(res)
})

export default Vue.extend({
  name: 'App'
})
</script>
<style lang="scss" scoped>
// @import "~@/styles/variables.scss";

.text {
  color: $success-color;
}
</style>
