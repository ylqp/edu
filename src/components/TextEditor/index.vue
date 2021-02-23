<template>
    <div ref="editor" class="text-editor"></div>
</template>
<script lang="ts">
import Vue from 'vue'
import { config } from 'vue/types/umd'
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
    name: 'TextEditor',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    // 组件已经渲染好 可以初始化操作dom了
    mounted () {
        this.initEditor()
    },
    methods: {
        initEditor () {
            const editor = new E(this.$refs.editor as any)
            // 事件监听必须在create之前
            editor.config.onchange = (value: string) => {
                // 同步父组件
                this.$emit('input', value)
            }

            // 创建编辑器
            editor.create()

            // 编辑器创建后才能初始化
            editor.txt.html(this.value)
            // 配置 server 接口地址
            // editor.config.uploadImgServer = '/upload-img'
            // 自定义图片上传
            editor.config.customUploadImg = async function (resultFiles: any, insertImgFn: any) {
                // resultFiles 是 input 中选中的文件列表
                // insertImgFn 是获取图片 url 后，插入到编辑器的方法
                // console.log(resultFiles, insertImgFn)
                // 1. 上传图片
                const fd = new FormData()
                fd.append('file', resultFiles[0])
                const { data } = await uploadCourseImage(fd)
                console.log(data)
                // 2. 上传图片，返回结果，将图片插入到编辑器中
                insertImgFn(data.data.name)
            }
        }
    }
})
</script>
<style lang="scss" scoped></style>
