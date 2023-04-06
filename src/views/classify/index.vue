<template>
  <van-nav-bar title="分类" fixed placeholder safe-area-inset-top />
  <van-tree-select
    v-model:active-id="activeId"
    v-model:main-active-index="activeIndex"
    :items="items"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeId = ref(1)
const activeIndex = ref(0)
const items = [
  {
    text: '湖北',
    children: [
      { text: '武汉', id: 1 },
      { text: '宜昌', id: 2 },
      { text: '荆州', id: 3, disabled: true }
    ]
  },
  {
    text: '湖南',
    children: [
      { text: '长沙', id: 4 },
      { text: '常德', id: 5 },
      { text: '株洲', id: 6 }
    ]
  },
  { text: '广东', disabled: true }
]
</script>

<style></style>
