<template>
    <div>
        <div class="topLine">
                <el-form :inline="true" ref="form" :model="form" label-width="80px">
                <el-form-item label="课程名称">
                    <el-input v-model="form.courseName"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择状态">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="addCourse" @click="$router.push({name: 'course-add'})">
                <i class="el-icon-plus"></i>新建课程
            </el-button>
        </div>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="ID">
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程名称">
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格">
        </el-table-column>
        <el-table-column
            prop="sortNum"
            label="排序">
        </el-table-column>
        <el-table-column
            prop="status"
            align="center"
            label="上架状态">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.status"
                    :disabled="scope.row.isStatusLoading"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                    @change="onStateChange(scope.row)">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
            width="250">
            <template slot-scope="scope">
                <el-button>编辑</el-button>
                <el-button @click="$router.push({
                    name: 'course-section',
                    params: {
                        courseId: scope.row.id
                    }
                })">内容管理</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { getCourses, changeState } from '@/services/course'
export default Vue.extend({
    name: 'CourseIndex',
    data () {
        return {
            form: {
                currentPage: 1,
                pageSize: 10,
                courseName: '',
                status: 0
            },
            tableData: []
        }
    },
    methods: {
        onSubmit () {
            console.log('查询')
        },
        async loadCourses () {
            const { data } = await getCourses(this.form)
            console.log(data)
            data.data.records.forEach((item: any) => {
                item.isStatusLoading = false
            })
            this.tableData = data.data.records
        },
        async onStateChange (course: any) {
            course.isStatusLoading = true
            const { data } = await changeState({
                courseId: course.id,
                status: course.status
            })
            this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`)
            course.isStatusLoading = false
        }
    },
    created () {
        this.loadCourses()
    }
})
</script>
<style lang="scss" scoped>
.topLine {
    display: flex;
    justify-content: space-between;
    align-content: center;
    .addCourse {
        height: 46px;
        i {
            margin-right: 5px;
        }
    }
}
</style>
