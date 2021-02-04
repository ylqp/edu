/**
 *  角色管理相关请求
 */

 import request from '@/utils/request'

 export const getRoles = (data: any) => {
     return request({
         method: 'POST',
         url: '/boss/role/getRolePages',
         data
     })
 }

 export const addOrUpdate = (data: any) => {
    return request({
        method: 'POST',
        url: '/'
    })
 }
