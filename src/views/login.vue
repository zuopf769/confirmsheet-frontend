<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">事件总线平台</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
          <template #prefix><svg-icon name="user" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          show-password
          @keyup.enter="handleLogin(loginRef)"
        >
          <template #prefix><svg-icon name="password" /></template>
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width: 100%"
          @click.prevent="handleLogin(loginRef)"
          @keyup.enter="handleLogin(loginRef)"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  // import Cookies from 'js-cookie'
  // import useCurrentInstance from '@/utils/useCurrentInstance'
  import SvgIcon from '@/components/common/SvgIcon.vue'
  import useUserStore from '@/store/user'
  import type { FormInstance } from 'element-plus'

  // const { proxy } = useCurrentInstance()
  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const { query } = route

  const loginForm = reactive({
    username: 'sadmin',
    password: '6572bdaff799084b973320f43f09b363'
  })
  const loginRules = {
    username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }]
  }
  const loading = ref(false)
  const redirect = ref((query.redirect as string) || undefined)
  const loginRef = ref<FormInstance>()

  function handleLogin(formEl: FormInstance | undefined) {
    if (!formEl) return
    router.push({ path: '/event/eventDemo' })
    // formEl.validate((valid) => {
    //   if (valid) {
    //     loading.value = true
    //     // 调用action的登录方法
    //     userStore
    //       .login(loginForm)
    //       .then(() => {
    //         router.push({ path: redirect.value || '/' })
    //       })
    //       .finally(() => {
    //         loading.value = false
    //       })
    //   }
    // })
  }
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .title {
    margin: 0 auto 30px;
    color: #707070;
    text-align: center;
  }

  .login-form {
    width: 400px;
    padding: 25px 25px 5px;
    background: #fff;
    border-radius: 6px;

    .el-input {
      height: 40px;

      input {
        height: 40px;
      }
    }

    .input-icon {
      width: 14px;
      height: 39px;
      margin-left: 0;
    }
  }

  .login-tip {
    font-size: 13px;
    color: #bfbfbf;
    text-align: center;
  }

  .login-code {
    float: right;
    width: 33%;
    height: 40px;

    img {
      vertical-align: middle;
      cursor: pointer;
    }
  }

  .el-login-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    font-family: Arial;
    font-size: 12px;
    line-height: 40px;
    letter-spacing: 1px;
    color: #fff;
    text-align: center;
  }

  .login-code-img {
    height: 40px;
    padding-left: 12px;
  }

  .a-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 14px;
    color: #606266;

    span {
      display: inline-block;
    }

    .el-icon {
      margin-left: 5px;
    }
  }
</style>
