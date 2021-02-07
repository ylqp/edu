<template>
    <el-container>
        <el-aside width="200px">
            <app-aside />
        </el-aside>
        <el-container>
            <el-header>
                <app-header></app-header>
            </el-header>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'LayouIndex',
  components: {
      // eslint-disable-next-line vue/no-unused-components
      AppAside,
      AppHeader
  }
})
</script>
<style lang="scss" scoped>
.el-container {
    min-height: 100vh;
    min-width: 980px;
}
.el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}
.el-main {
    background-color: #e9eef2;
}
</style>
