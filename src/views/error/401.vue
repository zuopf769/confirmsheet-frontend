<template>
  <div class="error">
    <div class="error-flex">
      <div class="left">
        <div class="left-item">
          <div class="left-item-animation left-item-num">401</div>
          <div class="left-item-animation left-item-title">您未被授权，没有操作权限~</div>
          <div class="left-item-animation left-item-msg">请联系管理员</div>
          <div class="left-item-animation left-item-btn">
            <el-button type="primary" round @click="onSetAuth">重新登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="401">
  import { Session } from '@/utils/storage'
  const router = useRouter()
  const onSetAuth = () => {
    Session.clear()
    // router.push('/login')
    router.push('/') // 待处理
  }
</script>

<style scoped lang="scss">
  @keyframes error-num {
    0% {
      opacity: 0;
      transform: translateY(60px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .error {
    display: flex;
    height: 100%;
    background-color: var(--el-color-white);

    .error-flex {
      display: flex;
      width: 900px;
      height: 350px;
      margin: auto;

      .left {
        display: flex;
        height: 100%;
        flex: 1;
        align-items: center;

        .left-item {
          .left-item-animation {
            opacity: 0;
            animation-duration: 0.5s;
            animation-name: error-num;
            animation-fill-mode: forwards;
          }

          .left-item-num {
            font-size: 55px;
            color: var(--el-color-info);
          }

          .left-item-title {
            margin: 15px 0 5px;
            font-size: 20px;
            color: var(--el-text-color-primary);
            animation-delay: 0.1s;
          }

          .left-item-msg {
            margin-bottom: 30px;
            font-size: 12px;
            color: var(--el-text-color-secondary);
            animation-delay: 0.2s;
          }

          .left-item-btn {
            animation-delay: 0.2s;
          }
        }
      }

      .right {
        opacity: 0;
        animation-duration: 2s;
        animation-name: error-img;
        animation-fill-mode: forwards;
        flex: 1;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
