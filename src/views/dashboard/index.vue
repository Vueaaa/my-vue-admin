<script setup lang="ts">
import { reactive } from "vue";
import { stackLine, nightingaleChart, clockChart } from "./options";
const stackLineReactive = reactive(stackLine);
const nightingaleChartRea = reactive(nightingaleChart);
const clockChartRea = reactive(clockChart);
const activities = [
  {
    content: "收藏博客",
    description: "xxx收藏了你的博客",
    timestamp: "30分钟前",
    color: "#00bcd4",
  },
  {
    content: "用户评价",
    description: "xxx给了某某博客一个差评，吐血啊",
    timestamp: "55分钟前",
    color: "#1ABC9C",
  },
  {
    content: "收藏博客",
    description: "xxx收藏了你的博客",
    timestamp: "30分钟前",
    color: "#00bcd4",
  },
  {
    content: "用户评价",
    description: "xxx给了某某博客一个差评，吐血啊",
    timestamp: "55分钟前",
    color: "#1ABC9C",
  },
  {
    content: "发布博客",
    description: "xxx发布了一个博客",
    timestamp: "1天前",
    color: "#009688",
  },
];
const ranks = [
  {
    title: "Vue",
    value: 10000,
    percent: 80,
    color: "#f25e43",
  },
  {
    title: "--",
    value: 8000,
    percent: 70,
    color: "#00bcd4",
  },
  {
    title: "--",
    value: 6000,
    percent: 60,
    color: "#64d572",
  },
  {
    title: "--",
    value: 5000,
    percent: 55,
    color: "#e9a745",
  },
  {
    title: "--",
    value: 4000,
    percent: 50,
    color: "#009688",
  },
];
</script>

<template>
  <el-row :gutter="20" class="mgb20">
    <el-col :span="6">
      <el-card shadow="hover" body-class="card-body">
        <el-icon class="card-icon bg1">
          <User />
        </el-icon>
        <div class="card-content">
          <countup class="card-num color1" :end="6666" />
          <div>用户访问量</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" body-class="card-body">
        <el-icon class="card-icon bg2">
          <ChatDotRound />
        </el-icon>
        <div class="card-content">
          <countup class="card-num color2" :end="168" />
          <div>系统消息</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" body-class="card-body">
        <el-icon class="card-icon bg3">
          <Avatar />
        </el-icon>
        <div class="card-content">
          <countup class="card-num color3" :end="18" />
          <div>用户数量</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover" body-class="card-body">
        <el-icon class="card-icon bg4">
          <List />
        </el-icon>
        <div class="card-content">
          <countup class="card-num color4" :end="568" />
          <div>文章数量</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="mgb20">
    <el-col :span="18">
      <el-card shadow="hover">
        <div class="card-header">
          <p class="card-header-title">访问动态</p>
          <p class="card-header-desc">
            月份访问状态，包括男性访问量和女性访问量
          </p>
        </div>
        <Charts
          :option="stackLineReactive"
          width="100%"
          height="300px"
        ></Charts>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card shadow="hover">
        <div class="card-header">
          <p class="card-header-title">时间</p>
          <p class="card-header-desc"></p>
        </div>
        <Charts :option="clockChartRea" width="100%" height="322px"></Charts>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="7">
      <el-card shadow="hover" :body-style="{ height: '400px' }">
        <div class="card-header">
          <p class="card-header-title">时间线</p>
          <p class="card-header-desc">最新的访问动态和活动信息</p>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :color="activity.color"
          >
            <div class="timeline-item">
              <div>
                <p>{{ activity.content }}</p>
                <p class="timeline-desc">{{ activity.description }}</p>
              </div>
              <div class="timeline-time">{{ activity.timestamp }}</div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
    <el-col :span="10">
      <el-card shadow="hover" :body-style="{ height: '400px' }">
        <div class="card-header">
          <p class="card-header-title">技术分布</p>
          <p class="card-header-desc">最近一个月技术博客的分布情况</p>
        </div>
        <Charts
          :option="nightingaleChartRea"
          width="100%"
          height="400px"
        ></Charts>
      </el-card>
    </el-col>
    <el-col :span="7">
      <el-card shadow="hover" :body-style="{ height: '400px' }">
        <div class="card-header">
          <p class="card-header-title">排行榜</p>
          <p class="card-header-desc">技术栈学习热门榜单Top5</p>
        </div>
        <div>
          <div class="rank-item" v-for="(rank, index) in ranks">
            <div class="rank-item-avatar">{{ index + 1 }}</div>
            <div class="rank-item-content">
              <div class="rank-item-top">
                <div class="rank-item-title">{{ rank.title }}</div>
                <div class="rank-item-desc">阅读量：{{ rank.value }}</div>
              </div>
              <el-progress
                :show-text="false"
                striped
                :stroke-width="10"
                :percentage="rank.percent"
                :color="rank.color"
              />
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style>
.card-body {
  display: flex;
  align-items: center;
  height: 100px;
  padding: 0;
}
</style>
<style lang="scss">
.card-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  line-height: 100px;
  color: #fff;
}

.bg1 {
  background: #2d8cf0;
}

.bg2 {
  background: #64d572;
}

.bg3 {
  background: #f25e43;
}

.bg4 {
  background: #e9a745;
}

.color1 {
  color: #2d8cf0;
}

.color2 {
  color: #64d572;
}

.color3 {
  color: #f25e43;
}

.color4 {
  color: #e9a745;
}

.card-content {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
  padding: 0 20px;

  .card-num {
    font-size: 30px;
  }
}

.card-header {
  padding-left: 10px;
  margin-bottom: 20px;
}

.card-header-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-header-desc {
  font-size: 14px;
  color: #999;
}

.chart {
  width: 100%;
  height: 400px;
}

.timeline-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #000;

  .timeline-time,
  .timeline-desc {
    font-size: 12px;
    color: #787878;
  }
}
.rank-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .rank-item-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f2f2f2;
    text-align: center;
    line-height: 40px;
    margin-right: 10px;
  }
  .rank-item-content {
    flex: 1;
    .rank-item-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #343434;
      margin-bottom: 10px;
      .rank-item-desc {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
