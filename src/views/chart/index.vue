<template>
    <div
      ref="container"
      :class="props.className"
      :style="{ width: props.width, height: props.height }"
    ></div>
  </template>
  
  <script setup>
  import {
    nextTick,
    onMounted,
    onUnmounted,
    ref,
    shallowRef,
    watch,
    watchEffect,
  } from 'vue'
  import * as echarts from 'echarts'
  
  // props
  const props = defineProps({
    option: {
      type: [Object, null],
      require: true,
    }, //配置项
    width: {
      type: String,
      default: '300px',
    },
    height: {
      type: String,
      default: '200px',
    },
    className: {
      type: String,
      default: 'cl-chartCom',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
    },
  })
  
  const container = ref(null) // 容器元素
  const instance = shallowRef(null) // 实例
  const resizeObserver = shallowRef(null) // 元素尺寸侦听器
  const debounceTimer = ref(null) //防抖计时器id
  
  // 初始化
  function init() {
    if (!container.value) return
  
    //查看容器上是否已经挂载了echarts实例 , 如果已挂载就获取并使用该实例,如果未挂载就进行初始化
    instance.value = echarts.getInstanceByDom(container.value)
    if (!instance.value) {
      instance.value = echarts.init(container.value)
    }
  
    // 绘制图表
    draw()
    // 侦听图表事件
    addListeningChartEvent()
  }
  // 绘制图表
  function draw() {
    if (!props.option || !instance.value) return
    instance.value.setOption(props.option, {
      notMerge: true,
    })
  }
  
  // 图表自适应
  // 重置图表尺寸
  function resize() {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = setTimeout(() => {
      instance.value?.resize({
        animation: {
          duration: 300,
        },
      })
      debounceTimer.value = null
    }, 300)
  }
  resizeObserver.value = new ResizeObserver(resize)
  
  // 重绘图表
  watch(props, () => {
    nextTick(() => {
      draw()
    })
  })
  
  // loading动画
  watchEffect(() => {
    props.loading ? instance.value?.showLoading() : instance.value?.hideLoading()
  })
  
  // echarts事件绑定
  function addListeningChartEvent() {
    // 点击事件
    props.onClick &&
      instance.value?.on('click', 'series', (e) => {
        props.onClick(e, instance.value, props.option)
      })
  }
  
  onMounted(() => {
    nextTick(() => {
      init()
      resizeObserver.value.observe(container.value)
    })
  })
  onUnmounted(() => {
    instance.value?.dispose()
    resizeObserver.value?.disconnect()
    resizeObserver.value = null
    clearTimeout(debounceTimer.value)
    debounceTimer.value = null
  })
  
  defineExpose({
    getInstance: () => instance.value,
    resize,
    draw,
  })
  </script>
  
  作者：Carlos_sam
  链接：https://juejin.cn/post/7375072812847251466
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。