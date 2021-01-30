<template>
  <div class="login">
    <!--
      1. :model="ruleForm"
      2. :rules="rules"
      3. ref="ruleForm"
      4. 绑定prop
     -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="isLoginLoading"
          type="primary"
          @click="onSubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script lang="ts">
import Vue from 'vue'
// import request from '@/utils/request'
// import qs from 'qs'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
      return {
        form: {
          // 18201288771 ==== 111111
          phone: '',
          password: ''
        },
        rules: {
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4, max: 10, message: '长度在4到10个字符', trigger: 'blur' }
          ]
        },
        isLoginLoading: false
      }
    },
    methods: {
      async onSubmit () {
        try {
          // 1.表单验证
          await (this.$refs.form as Form).validate()

          // 登录按钮loading
          this.isLoginLoading = true

          // 2. 验证通过 -》提交表单
          // const { data } = await request({
          //   method: 'POST',
          //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
          //   url: '/front/user/login',
          //   data: qs.stringify(this.form) // axios 默认格式application/json
          // })

          const { data } = await login(this.form)
          // 3.处理请求结果
          if (data.state !== 1) { // 失败
             this.$message.error(data.message)
          } else { // 成功
            this.$router.push({
              name: 'home'
            })
            this.$message.success('登录成功')
          }
        } catch (err) {
          console.log('登录失败', err)
        }
        //  请求之后删掉loading
        this.isLoginLoading = false
      }
    }
})
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    padding: 20px;
    background-color: #fff;
    .el-button {
      width: 100%;
    }
  }
}
</style>
