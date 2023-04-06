import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'
import SvgIcon from './components/SvgIcon/SvgIcon.vue'
// 引入iconfont
import './assets/iconfont/iconfont.js'

// 引入fastclick
// import FastClick from 'fastclick'
// FastClick.attach(document.body)

// 引入路由
import router from './router/index'
// 引入vant
import vant from 'vant'
// 引入组件样式 (这里是全部引入)
import 'vant/lib/index.css'
// 动态设置rem
import 'amfe-flexible/index.js'
import 'lib-flexible/flexible'
// import './utils/lib-flexible/flexible'
// 引入状态管理
import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App)
// iconfont图标
app.component('SvgIcon', SvgIcon)
// 使用路由等
app.use(router).use(pinia).use(vant).mount('#app')
