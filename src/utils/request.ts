import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin () {
    router.push({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

function refreshToken () {
    return axios.create()({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
            refreshtoken: store.state.user.refresh_token
        })
    })
}
const request = axios.create({
    // 配置选项

})
// 请求拦截器
request.interceptors.request.use(function (config) {
    const { user } = store.state

    if (user && user.access_token) {
        config.headers.Authorization = user.access_token
    }
    // 这里一定要返回config，否则请求发不出去
    return config
})
// 响应拦截器
let isRefreshing = false // 控制状态 避免多次刷新
let requests: any[] = [] // 存储刷新 token 期间过来的401请求

request.interceptors.response.use(function (response) { // 状态为2XX都会进入这里
    console.log(response)
    // 如果是自定义错误状态码，错误处理就写到这里
    return response
}, async function (error) {
    // 如果是使用HTTP状态码。 错误处理写到这里
    if (error.response) { // 请求收到响应 状态码超出了2XX
        const { status } = error.response
        if (status === 400) {
            Message.error('请求参数错误')
        } else if (status === 401) {
            // token无效
            if (!store.state.user) { // 没有state
                redirectLogin()
                return Promise.reject(error)
            }
            if (!isRefreshing) {
                isRefreshing = true // 开启刷新状态
                // 1. 如果有refresh_token
                return refreshToken().then(res => {
                    if (!res.data.success) {
                        throw new Error('刷新 Token 失败')
                    }
                    // 成功 ===》1.更新
                    store.commit('setUser', res.data.content)
                    // 成功 ===》2.重新发送
                    requests.forEach(cb => cb())
                    // 重置requests
                    requests = []
                    return request(error.config)
                }).catch((err) => {
                    // 清除当前
                    store.commit('setUser', null)
                    redirectLogin()
                    return Promise.reject(err)
                }).finally(() => {
                    isRefreshing = false
                })
                // try {
                //     const { data } = await refreshToken()
                //     // 成功 ===》1.更新
                //     store.commit('setUser', data.content)
                //     // 成功 ===》2.重新发送
                //     return request(error.config)
                // } catch (err) {
                //     // 清除当前
                //     store.commit('setUser', null)
                //     redirectLogin()
                //     return Promise.reject(error)
                // }
            }
            // 刷新状态下 把请求挂起来
            return new Promise(resolve => {
                requests.push(() => {
                    resolve(request(error.config))
                })
            })
        } else if (status === 403) {
            Message.error('没有权限，请联系管理员')
        } else if (status === 404) {
            Message.error('请求资源不存在')
        } else if (status >= 500) {
            Message.error('服务端错误，请联系管理员')
        }
    } else if (error.request) { // 本次请求发出去没有收到响应 (请求超时，网络断开了)
        Message.error('请求超时，请刷新重试')
    } else { // 在设置请求时发生了一些事情，触发了一个错误 （未知的）
        Message.error(`请求失败：${error.message}`)
    }
    // 把请求失败的错误对象继续抛出，扔给上一个调用者
    return Promise.reject(error)
})

export default request
