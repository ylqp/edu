/**
 * 资源相关请求模块
 */
import request from '@/utils/request'
// import qs from 'qs'
// import store from '@/store'


// 获取资源列表
export const getResourcePages = (data: any) => {
    return request({
        method: 'post',
        url: '/boss/resource/getResourcePages',
        data
    })
}
// 获取资源分类
export const getResourceCategories = () => {
    return request({
        method: 'POST',
        url: '/boss/resource/category/getAll'
    })
}
