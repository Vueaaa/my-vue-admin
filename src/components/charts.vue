<template>
  <div ref="container" :class="props.className" :style="{ width: props.width, height: props.height }"></div>
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
// 使用ref接受了echarts实例，使得echarts实例被代理为了响应式对象，进而影响了echarts对内部属性的访问。
//eg:tooltip
//或者改为普通对象
const instance = shallowRef(null) // 实例
const resizeObserver = shallowRef(null) // 元素尺寸侦听器
const debounceTimer = ref(null) //防抖计时器id

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

onMounted(() => {
  nextTick(() => {
    init()
    resizeObserver.value.observe(container.value)
  })
})
onUnmounted(() => {
  // instance.value?.dispose()
  resizeObserver.value?.disconnect()
  resizeObserver.value = null
  clearTimeout(debounceTimer.value)
  debounceTimer.value = null
})

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
  if (!props.option || !instance.value) return;
  // 每秒更新一次时钟数据
  setInterval(function () {
    var date = new Date();
    var second = date.getSeconds();
    var minute = date.getMinutes() + second / 60;
    var hour = (date.getHours() % 12) + minute / 60;

    // 设置动画持续时间
    props.option.animationDurationUpdate = 300;

    // 检查是否为时钟的图表
    if (props.option.title && props.option.title.text === 'clock') {
      instance.value.setOption({
        series: [
          {
            name: 'hour',
            animation: hour !== 0, // 如果小时不为 0，启用动画
            data: [{ value: hour }],
          },
          {
            name: 'minute',
            animation: minute !== 0, // 如果分钟不为 0，启用动画
            data: [{ value: minute }],
          },
          {
            name: 'second',
            animation: second !== 0, // 如果秒不为 0，启用动画
            data: [{ value: second }],
          },
        ],
      });
    }
  }, 1000);
  // 初始化图表
  instance.value.setOption(props.option, {
    notMerge: true,
  });
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

// echarts事件绑定
function addListeningChartEvent() {
  // 点击事件
  props.onClick &&
    instance.value?.on('click', 'series', (e) => {
      props.onClick(e, instance.value, props.option)
    })
}

defineExpose({
  getInstance: () => instance.value,
  resize,
  draw,
})
</script>