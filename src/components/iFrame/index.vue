<template>
  <div v-loading="iframeLoading" class="h-full">
    <iframe ref="iframeRef" :src="url" frameborder="no" height="100%" width="100%" scrolling="auto"></iframe>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    // postMessage发送方的origin, 字符串为协议、域名和端口号拼接
    origin: {
      type: String,
      required: true
    },
    // iframe src 地址
    src: {
      type: String,
      required: true
    },
    // 单据id
    id: {
      type: [String, Number],
      default: ''
    },
    // 查看且可编辑 需设置 mode='edit'
    mode: {
      type: String,
      default: ''
    },
    // 回调函数集合
    callbacks: {
      type: Object
    }
  })
  // 低代码平台 传参 type和jssdk
  const url = computed(() => {
    // 例如：http://1.13.0.252:3330/tree_grid/?type=form&mode=edit&jssdk=http://1.13.0.252:3330/lib/workflow-sdk.min.js#/ds/action-meta-views/edit/114

    // const src = props.src + (props.id ? '/' + props.id : '')
    // return `${src}?type=form${props.mode ? '&mode=' + props.mode : ''}&jssdk=${location.origin}/lib/workflow-sdk.min.js`

    const urlArr = props.src.split('#')
    const endUrl = urlArr[1] ? `#${urlArr[1]}${props.id ? '/' + props.id : ''}` : ''
    return `${urlArr[0]}?type=form${props.mode ? '&mode=' + props.mode : ''}&jssdk=${
      location.origin
    }/lib/workflow-sdk.min.js${endUrl}`
  })
  const childOrigin = computed(() => props.origin)
  const iframeLoading = ref<boolean>(true)
  const workFlowSDK = ref<any>(null)
  const iframeRef = ref<HTMLIFrameElement | null>(null)

  // 销毁监听
  const handleDestory = () => {
    workFlowSDK.value && workFlowSDK.value!.destory()
  }

  // 创建sdk对象
  const createWorkFlow = () => {
    workFlowSDK.value = new window.WorkFlowSDK({
      targetEndpoint: iframeRef.value!.contentWindow,
      targetOrigin: childOrigin.value,
      callbacks: props.callbacks
    })
  }

  // 改变Iframe css
  const resizeIframe = () => {
    const DEFAULT_HEIGHT = 400 // 初始高度
    const dContextWindow = iframeRef.value?.contentWindow

    // 特殊处理 低代码表单内容区域，这个区域高度需要监听，网速慢时，内容加载延时，需要不停的计算高度
    const viewFormPanel: HTMLElement | null | undefined = dContextWindow?.document.querySelector('[name*=form]')

    if (!dContextWindow?.document?.body?.scrollHeight) {
      iframeRef.value!.height = `${DEFAULT_HEIGHT}` // 没有滚动条时设置最小高度
    } else {
      const dScrollHeight = dContextWindow.document.documentElement.scrollHeight || 0
      const bScrollHeight = dContextWindow.document.body.scrollHeight || 0
      const bOffsetHeight = dContextWindow.document.body.offsetHeight || 0
      const maxHeight = Math.max(dScrollHeight, bScrollHeight, bOffsetHeight, DEFAULT_HEIGHT)
      const formPanelHeight = viewFormPanel && viewFormPanel.scrollHeight + 20
      // console.log(`iframe body offsetHeight:`, bOffsetHeight)
      // console.log(`iframe body scrollHeight:`, bScrollHeight)
      // console.log(`iframe body maxHeight:`, maxHeight)
      // console.log(`iframe body form height:`, formPanelHeight)

      // iframeRef.value!.height = `${maxHeight}`
      iframeRef.value!.height = `${Math.max(formPanelHeight || 0, maxHeight)}`
    }

    // 修改iframe内低代码的css
    const viewTab: any = dContextWindow?.document.querySelector('.view-tabs')
    viewTab && (viewTab.style.backgroundColor = '#fff')
    const viewPanel: any = dContextWindow?.document.querySelector('.view-tabs .panel')
    viewPanel && (viewPanel.style.border = 'none')

    // if (viewFormPanel) {
    //   clearInterval(timeInterval)
    // }
  }

  watch(
    () => props.origin,
    () => {
      if (!workFlowSDK.value) {
        createWorkFlow()
      }
    }
  )

  // 目前由于低代码平台加载表单太慢，先设置时间5分钟，否则表单加载慢，内容加载完后，滚动条会出现
  const secondNum = 300 // 60 秒
  let count = 0 // 计时
  let timeInterval: NodeJS.Timer
  onMounted(() => {
    nextTick(() => {
      iframeLoading.value = true

      if (!iframeRef.value!) return false

      monitorError()

      iframeRef.value!.onload = () => {
        iframeLoading.value = false
      }

      if (props.origin) {
        createWorkFlow()
      }

      // 计时器 循环计算 改变子窗口样式
      timeInterval = setInterval(() => {
        if (count >= secondNum) {
          clearInterval(timeInterval)
        }
        resizeIframe()
        count++
      }, 200)
    })
  })

  // 如果页面报错则停止计时
  const monitorError = () => {
    window.addEventListener(
      'error',
      function (event: any) {
        try {
          clearInterval(timeInterval)
        } catch (err) {}
      },
      true
    )
  }

  onUnmounted(() => {
    handleDestory()
    clearInterval(timeInterval)
  })

  defineExpose({ workFlowSDK, handleDestory, resizeIframe })
</script>
<style scoped lang="scss">
  // iframe {
  //   vertical-align: top;
  // }
</style>
