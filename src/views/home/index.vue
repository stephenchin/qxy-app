<template>
  <van-nav-bar title="首页" fixed placeholder safe-area-inset-top @click-right="onClickRight">
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <h3 class="home">{{ test.title }}</h3>
  <div class="m-t-20">
    <svg-icon iconName="icon-wode" color="#ff0000" className="size"></svg-icon>
    <svg-icon iconName="icon-sousuo" color="#00ff00" className="size"></svg-icon>
    <svg-icon iconName="icon-wodedizhi" color="#0000ff" className="size"></svg-icon>
  </div>
  <!-- 按钮 -->
  <div class="m-t-20">
    <van-button type="danger" @click="jump('zhangsan')">
      <svg-icon iconName="icon-wode" color="#ffffff" className="m-r-10"></svg-icon>去子页面
    </van-button>
  </div>

  <!-- 评分 -->
  <div class="rate m-t-20">
    <van-rate v-model="rateValue" @change="changeRateValue"></van-rate>
  </div>

  <div style="height: 300px">123</div>
  <div style="height: 300px">123</div>
  <div style="height: 300px">123</div>
  <div style="height: 300px">123</div>
  <div style="height: 300px">123</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useTestStore } from '../../store/index'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const jump = (name: string) => {
  router.push({
    name: 'child',
    query: {
      id: '1',
      name: name
    }
  })
}

const test = useTestStore()

// 评分
const rateValue = ref(5) //默认五星

const changeRateValue = (e: number) => {
  console.log(e) //评分变化 打印星数
}

onMounted(() => {
  console.log('router:', router.currentRoute.value.query)
})

const onClickRight = () => {
  showToast('按钮')
}
</script>

<style scoped>
.m-t-20 {
  margin-top: 20px;
}
.m-r-10 {
  margin-right: 10px;
}
.font-20 {
  font-size: 20px;
}
.size {
  width: 40px;
  height: 25px;
}
.rate {
  padding: 40px;
  margin: 0 auto;
}
</style>
