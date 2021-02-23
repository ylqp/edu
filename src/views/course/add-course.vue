<template>
    <div class="add-course">
        <el-card>
            <div slot="header">
                <el-steps :active="activeStep" simple>
                    <!-- <el-step title="基本信息" icon="el-icon-edit" @click.native="activeStep = 0"></el-step>
                    <el-step title="课程封面" icon="el-icon-upload" @click.native="activeStep = 1"></el-step>
                    <el-step title="销售信息" icon="el-icon-picture" @click.native="activeStep = 2"></el-step>
                    <el-step title="秒杀活动" icon="el-icon-picture" @click.native="activeStep = 3"></el-step>
                    <el-step title="课程详情" icon="el-icon-picture" @click.native="activeStep = 4"></el-step> -->
                    <el-step
                        v-for="(item, index) in steps"
                        :key="index"
                        :title="item.title"
                        :icon="item.icon"
                        @click.native="activeStep = index"
                        >
                    </el-step>
                </el-steps>
            </div>
            <el-form label-width="80px">
                <div v-show="activeStep === 0">
                    <el-form-item label="名称">
                        <el-input v-model="course.courseName"></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input v-model="course.brief"></el-input>
                    </el-form-item>
                    <el-form-item label="讲师姓名">
                        <el-input v-model="course.teacherDTO.teacherName"></el-input>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="course.teacherDTO.position"></el-input>
                    </el-form-item>
                    <el-form-item label="讲师简介">
                        <el-input v-model="course.teacherDTO.description"></el-input>
                    </el-form-item>
                    <el-form-item label="课程概述">
                        <el-input
                            v-model="course.previewFirstField"
                            type="textarea"
                            style="margin-bottom: 10px"
                            placeholder="概述一"
                        ></el-input>
                        <el-input
                            v-model="course.previewSecondField"
                            type="textarea"
                            placeholder="概述二"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="课程排序">
                        <el-input-number v-model="course.sortNum" label="描述文字"></el-input-number>
                    </el-form-item>
                </div>
                <div v-show="activeStep === 1">
                    <el-form-item label="课程封面">
                        <!-- 支持自动上传 只需要配置参数 （需要单独配置headers 以及 用户token）但是比较麻烦 所以使用http-request自己写 -->
                        <!-- <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :http-request="handleUpload">
                            <img v-if="course.courseListImg" :src="course.courseListImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload> -->
                        <!--
                            1. 组件需要根据绑定的数据进行图片预览
                            2. 组件需要把上传成功的图片地址同步到绑定的数据中
                            v-model 的本质还是父子组件通信
                                1. 它会给子组件传递一个名字叫value 的数据
                                2. 默认监听 input 事件，修改绑定的数据（自定义事件）
                         -->
                        <course-image v-model="course.courseListImg"/>
                    </el-form-item>
                    <el-form-item label="介绍封面">
                        <course-image v-model="course.courseImgUrl"/>
                    </el-form-item>
                </div>
                <div v-show="activeStep === 2">
                    <el-form-item label="售卖价格">
                        <el-input>
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品原价">
                        <el-input>
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="销量">
                        <el-input>
                            <template slot="append">单</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="活动标签">
                        <el-input>
                        </el-input>
                    </el-form-item>
                </div>
                <div v-show="activeStep === 3">
                    <el-form-item label="限时秒杀开关">
                        <el-switch
                            v-model="isSecKill"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <template v-if="isSecKill">
                        <el-form-item label="开始时间">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="秒杀价">
                            <el-input>
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="秒杀库存">
                            <el-input>
                            </el-input>
                        </el-form-item>
                    </template>
                </div>
                <div v-show="activeStep === 4">
                    <el-form-item label="课程详情">
                        <!-- <el-input v-model="course.isNewDes" type="textarea"></el-input> -->
                        <text-editor v-model="course.courseDescriptionMarkDown" />
                    </el-form-item>
                    <el-form-item>
                        <el-button
                        @click="handleSave"
                        type="primary">
                        保存
                    </el-button>
                    </el-form-item>
                </div>
                <el-form-item v-if="activeStep<4">
                    <el-button @click="activeStep++">下一步</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { addOrUpdateCourse, uploadCourseImage } from '@/services/course'
import CourseImage from './components/CourseImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'
export default Vue.extend({
    name: 'AddCourse',
    components: { CourseImage, TextEditor },
    data () {
        return {
            activeStep: 0,
            steps: [
                { title: '基本信息', icon: 'el-icon-edit' },
                { title: '课程封面', icon: 'el-icon-upload' },
                { title: '销售信息', icon: 'el-icon-picture' },
                { title: '秒杀活动', icon: 'el-icon-picture' },
                { title: '课程详情', icon: 'el-icon-picture' }
            ],
            imageUrl: '', // 预览图片地址
            isSecKill: false, // 是否秒杀
            course: {
                courseName: '',
                brief: '',
                courseListImg: '',
                courseImgUrl: '',
                teacherDTO: {
                    teacherName: '',
                    position: '',
                    description: ''
                },
                sortNum: 3,
                previewFirstField: '',
                previewSecondField: '',
                courseDescriptionMarkDown: '<h1>hrllo</h1>'
                // status: 1 // 0: 未上架 1: 直接上架
            }
        }
    },
    methods: {
        async handleSave () {
            const { data } = await addOrUpdateCourse(this.course)
            console.log(data)
            this.$router.back()
        }
    }
})
</script>
<style lang="scss" scoped>
.el-step {
    cursor: pointer;
}

</style>
