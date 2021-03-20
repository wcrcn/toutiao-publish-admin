<template>
  <div class="login_container">
    <div class="login">
      <div class="login_form">
        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" prefix-icon="el-icon-phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="form.code" prefix-icon="el-icon-success" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item prop="agreement">
              <el-checkbox v-model="form.agreement" label="我以阅读并同意用户协议和隐私条款"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/utils/login'
export default {
  name: 'LoginIndex',
  data () {
    const checkAgreement = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('协议不能为空'))
      }
      callback()
    }
    return {
      form: {
      },
      agreement: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '请输入6位数的验证码', trigger: 'blur' }
        ],
        agreement: [
          { validator: checkAgreement, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.form).then(res => {
            const result = res.data.data
            window.localStorage.setItem('user', result.token)
            this.$router.push('/')
          })

          return true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
.login_container {
  position:fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    padding: 20px;
    background: #fff;
    width: 300px;
  }
}
</style>
