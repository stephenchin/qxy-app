<template>
  <van-nav-bar title="我的" fixed placeholder safe-area-inset-top>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <!-- 优惠券单元格 -->
  <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
  <!-- 优惠券列表 -->
  <van-popup v-model:show="showList" round position="bottom" style="height: 90%; padding-top: 4px">
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      @change="onChange"
      @exchange="onExchange"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import { CouponInfo } from 'vant'
import { ref } from 'vue'
const coupon = {
  available: 1,
  condition: '无门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元'
} as unknown as CouponInfo

const disabledCoupons = ref([coupon])

const coupons = ref([coupon])
const showList = ref(false)
const chosenCoupon = ref(-1)

const onChange = (index: number) => {
  showList.value = false
  chosenCoupon.value = index
}
const onExchange = (code: number) => {
  coupons.value.push(coupon)
}
</script>

<style lass="less" scoped></style>
