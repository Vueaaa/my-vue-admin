<script setup>
import { onMounted, onUnmounted, ref ,nextTick} from 'vue'
import * as echarts from 'echarts'

// props
const props = defineProps({
  option: {
    type: [Object, null],
    require: true,
  }, //配置项
})

// 容器元素
const container = ref(null)
// 实例
//使用ref接受了echarts实例，使得echarts实例被代理为了响应式对象，进而影响了echarts对内部属性的访问
const instance = ref(null)
// 初始化
function init() {
  if (!container.value) return

  //查看容器上是否已经挂载了echarts实例 , 如果已挂载就获取并使用该实例,如果未挂载就进行初始化
  instance.value = echarts.getInstanceByDom(container.value)
  if (!instance.value) {
    instance.value = echarts.init(container.value)
  }
   draw()
}
// 绘制图表
function draw() {
  if (!props.option || !instance.value) return
  instance.value.setOption(props.option)
}

onMounted(() => {
    //?
  nextTick(() => {
    init()
  })
})
</script>

<template>
<div ref="container" style="width: 600px;height: 400px;"></div>
</template>

<style scoped>

</style>