/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// import qs from 'qs'
// import store from '@/store'

export const addOrUpdateMenu = (data: any) => {
    return request({
        method: 'POST',
        url: '/boss/menu/saveOrUpdate',
        data
    })
}

export const getEditMenuInfo = (id = -1) => {
    return request({
        method: 'GET',
        url: '/boss/menu/getEditMenuInfo',
        params: {
            id
        }
    })
}

export const getAllMenus = () => {
    return request({
        method: 'GET',
        url: '/boss/menu/getAll'
    })
}
