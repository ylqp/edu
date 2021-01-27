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
interface Foo {
  a: string
  b: number
}
export default {
    data () {
        return {
          aa: 1
        }
    }
}
</script>
<style lang="scss" scoped>
// @import "~@/styles/variables.scss";

.text {
  color: $success-color;
}
</style>
