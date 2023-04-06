<template>
  <van-config-provider theme="light">
    <!-- 定义子路由出口 -->
    <router-view></router-view>
    <!-- Tabbar -->
    <van-tabbar v-model="active" placeholder route safe-area-inset-bottom>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="video-o" badge="30" to="/videos">视频</van-tabbar-item>
      <van-tabbar-item icon="contact" dot to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </van-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style></style>
