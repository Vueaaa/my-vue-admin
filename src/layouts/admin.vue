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
        <div class="content">
          <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
              <!-- <keep-alive :include="tabs.nameList"> -->
                <component :is="Component"></component>
              <!-- </keep-alive> -->
            </transition>
          </router-view>
        </div>
    </div>
    </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  overflow: hidden;
}

.content-box {
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
.content {
    width: auto;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    box-sizing: border-box;
}

.content::-webkit-scrollbar {
    width: 0;
}
</style>