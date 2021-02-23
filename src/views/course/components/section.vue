<template>
    <div class="course-section">
        <el-card>
            <div slot="header">
                课程名称
            </div>
            <el-tree
                :data="data"
                :props="defaultProps"
                @node-click="handleNodeClick"
                draggable=""></el-tree>
        </el-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'CourseSection',
    props: {
        courseId: {
            type: [String, Number],
            required: true
        }
    },
    data () {
        return {
            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                    label: '三级 1-1-1'
                    }]
                }]
                }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                    label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                    label: '三级 2-2-1'
                    }]
                }]
                }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                    label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                    label: '三级 3-2-1'
                    }]
                }]
                }],
            defaultProps: {
            children: 'children',
            label: 'label'
            }
        }
    }
})
</script>
<style lang="scss" scoped></style>
