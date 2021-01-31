/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
import qs from 'qs'
// import store from '@/store'

interface User {
    phone: string
    password: string
}
export const login = (data: User) => {
    return request({
        method: 'POST',
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: '/front/user/login',
        // 如果 data 是普通对象，则 content-Type 默认是 application/json
        // 如果 data 是 qs.stringify(data)，则 content-Type 默认设置为application/x-www-form-urlencoded
        // 如果 data 是 FormData （上传文件类型）, 则 content-Type 是 multipart/form-data
        data: qs.stringify(data) // axios 默认格式application/json 使用了这个方法 header默认转换类型
    })
}
export const getUserInfo = () => {
    return request({
        method: 'GET',
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: '/front/user/getInfo'
        //  请求拦截器统一设置了
        // headers: {
        //     Authorization: store.state.user.access_token
        // }
    })
}
