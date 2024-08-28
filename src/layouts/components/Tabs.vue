<script setup lang='ts'>
import {ref,watch} from "vue"

</script>

<template>
<div class="tabs-container">
    <el-tabs v-model="activePath" class="tabs" type="card" closable @tab-click="clickTabls" @tab-remove="closeTabs">
            <el-tab-pane
                v-for="item in tabs.list"
                :key="item.path"
                :label="item.title"
                :name="item.path"
                @click="setTags(item)"
            ></el-tab-pane>
        </el-tabs>
        <div class="Tabs-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="small" type="primary" plain>
                    标签选项
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="small">
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="current">关闭当前</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>,
</div>
</template>

<style scoped>
.tabs-container{
    background: #fff;
    padding: 2px 120px 0 0;
}
</style>