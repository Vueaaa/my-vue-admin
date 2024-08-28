<script setup lang='ts'>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import Tabs from "./components/Tabs.vue"
</script>

<template>
  <div class="wrapper">
        <FHeader></FHeader>
        <FMenu></FMenu>
        <div class="content-box">
        <Tabs></Tabs>
        </div>
  </div>
</template>

<style scoped>
.wrapper{
  height: 100vh;
  overflow: hidden;
}
.content-box{
  position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    padding-bottom: 30px;
    /* 设置过渡效果，持续时间为0.3秒，过渡的时间函数是 ease-in-out（开始和结束慢，中间快） */
    -webkit-transition: left 0.3s ease-in-out;
    transition: left 0.3s ease-in-out;
    background: #eef0fc;
    /* overflow: hidden; */
}
</style>