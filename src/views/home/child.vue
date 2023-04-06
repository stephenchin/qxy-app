<template>
  <van-nav-bar title="子页面接收参数" left-text="返回" left-arrow @click-left="onClickLeft" />

  <div class="font-20">
    <div>id: {{ paramId }}</div>
    <div>name: {{ paramName }}</div>
  </div>

  <div>
    <router-link to="/home">回主页</router-link>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const paramId = ref()
const paramName = ref()

onMounted(() => {
  // 获取当前路由实例参数
  console.log('router:', router.currentRoute.value.query)
  paramId.value = router.currentRoute.value.query.id
  paramName.value = router.currentRoute.value.query.name
})

const onClickLeft = () => history.back()
</script>

<style scoped lang="stylus">

.font-20 {
  font-size: 20px;
}
</style>
