<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in breadList"
                :key="index"
                :to="{ path: '/' }">{{item.meta.title}}</el-breadcrumb-item>
            <!-- <breadcrumb /> -->
        </el-breadcrumb>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Breadcrumb',
    data () {
        return {
            breadList: [] // 路由集合
        }
    },
    watch: {
        $route () {
            this.getBreadcrumb()
        }
    },
    methods: {
        isHome (route: any) {
            return route.name === 'home'
        },
        getBreadcrumb () {
            let matched: any = this.$route.matched
            // 如果不是首页
            if (!this.isHome(matched[0])) {
                matched = [{ path: 'home', meta: { title: '首页' } }].concat(matched)
            }
            this.breadList = matched
        }
    },
    created () {
        this.getBreadcrumb()
    }
})
</script>
<style lang="scss" scoped></style>
