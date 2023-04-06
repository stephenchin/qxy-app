import { defineStore, acceptHMRUpdate } from 'pinia'
import { Names } from './store-name'

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useTestStore = defineStore({
  // 每个store文件必须有个唯一的标志
  id: Names.TEST,
  // 用来存储全局数据
  state: () => ({
    title: 'welcome to jxtech-app-starter! from pinia'
  }),
  // 用来监视或者说是计算状态的变化的，有缓存的功能。
  getters: {},
  // 对state里数据变化的业务逻辑，就是修改state全局状态数据的。
  actions: {}
})

// @ts-ignore，热更新的配置
if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useTestStore, import.meta.hot))
}
