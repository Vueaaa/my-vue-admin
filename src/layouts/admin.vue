<script setup lang='ts'>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
</script>

<template>
  <el-container>
    <el-header style="padding: 0">
        <FHeader></FHeader>
    </el-header>
    <el-container>
      <el-aside>
        <FMenu></FMenu>
      </el-aside>
      <el-main >
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>