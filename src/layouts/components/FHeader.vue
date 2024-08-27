<script setup lang='ts'>
import imgurl from '@/assets/img/avator.jpg'
const setFullScreen = () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.body.requestFullscreen.call(document.body);
    }
};
</script>

<template>
    <div class="layout-header">
        <div class="header-left">
            <img class="logo" src="@/assets/img/logo.png" alt="">
            <p class="text">后台管理系统</p>
        </div>
        <div class="header-right">
            <div class="full-screen" @click="setFullScreen">
                <el-tooltip effect="dark" content="全屏" placement="bottom">
                    <el-icon><FullScreen /></el-icon>
                </el-tooltip>
            </div>
            <!-- 用户头像 -->
            <el-avatar class="user-avator" :size="30" :src="imgurl" />
            <!-- 用户名下拉菜单 -->
            <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{ '阿瑞' }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <a href="">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>
                        <a href="">
                            <el-dropdown-item>官方文档</el-dropdown-item>
                        </a>
                        <!-- <el-dropdown-item command="user">个人中心</el-dropdown-item> -->
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    color: var(--header-text-color);
    background-color: var(--header-bg-color);
    border-bottom: 1px solid #ddd;

    .header-left {
        display: flex;
        align-items: center;
        padding-left: 20px;

        .logo {
            width: 38px;
        }

        .text {
            padding-left: 16px;
            font-size: 22px;
        }
    }

    .header-right{
        display: flex;
        align-items: center;
        padding-right: 30px;
        .full-screen{
            padding-right: 26px;
        }
        .user-name{
            font-size: 17px;
            color: #fff;
            padding-left: 6px;
            cursor: pointer;
        }
    }

}
</style>