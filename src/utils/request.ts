import axios from 'axios'
import { showFailToast } from 'vant'
// import { getToken } from '@/utils/auth'

export const request = (options: any) => {
  return new Promise((resolve, reject) => {
    // 创建 axios 实例
    const service = axios.create({
      // baseURL: process.env.BASE_API, // api 的 base_url
      baseURL: '/api',
      timeout: 20000 // 请求超时 20s
    })

    // 前置拦截器（发起请求之前的拦截）
    service.interceptors.request.use(
      (config: any) => {
        /**
         * 根据你的项目实际情况来对 config 做处理
         */
        let token: string = '' //此处换成自己获取回来的token，通常存在在cookie或者store里面
        if (token) {
          // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
          config.headers['X-Token'] = token

          config.headers.Authorization = +token
        }
        return config
      },
      error => {
        // Do something with request error
        console.log('出错啦', error) // for debug
        Promise.reject(error)
      }
    )

    // 后置拦截器（获取到响应时的拦截）
    service.interceptors.response.use(
      (response: any) => {
        /**
         * 根据你的项目实际情况来对 response 和 error 做处理
         * 这里对 response 和 error 不做任何处理，直接返回
         */
        return response.data
      },
      error => {
        console.log('err' + error) // for debug
        if (error.response.status == 403) {
          showFailToast('错了')
        } else {
          showFailToast('服务器请求错误，请稍后再试')
        }
        return Promise.reject(error)
      }
    )
    // 请求处理
    service(options)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default request
