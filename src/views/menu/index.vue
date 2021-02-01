<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-button @click="$router.push({ name: 'menu-add'})">添加菜单</el-button>
        </div>
        <el-table
            :data="menus"
            style="width: 100%">
            <el-table-column
                prop="date"
                type="index"
                label="编号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="菜单名称">
            </el-table-column>
            <el-table-column
                prop="level"
                label="菜单级数">
            </el-table-column>
            <el-table-column
                prop="icon"
                label="前端图标">
            </el-table-column>
            <el-table-column
                prop="orderNum"
                label="排序">
            </el-table-column>
            <el-table-column
                min-width="150"
                label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script lang="ts">
import Vue from 'vue'
import { getAllMenus } from '@/services/menu'
export default Vue.extend({
    name: 'menuIndex',
    data () {
        return {
            menus: []
        }
    },
    created () {
        this.loadAllMenus()
    },
    methods: {
        async loadAllMenus () {
            const { data } = await getAllMenus()
            console.log(data)
            if (data.code === '000000') {
                this.menus = data.data
            }
        },
        handleEdit () {
            console.log(22)
        },
        handleDelete () {
            console.log(33)
        }
    }
})
</script>
<style lang="scss" scoped></style>
