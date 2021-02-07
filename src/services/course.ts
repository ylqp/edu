/**
 * 课程相关请求模块
 */
import request from '@/utils/request'

export const getCourses = (data: any) => {
    return request({
        method: 'POST',
        url: '/boss/course/getQueryCourses',
        data
    })
}

// 课程上下架
export const changeState = (params: any) => {
    return request({
        method: 'GET',
        url: '/boss/course/changeState',
        params
    })
}

// 添加或者更新课程
export const addOrUpdateCourse = (data: any) => {
    return request({
        method: 'POST',
        url: '/boss/course/saveOrUpdateCourse',
        data
    })
}

// 上传
export const uploadCourseImage = (data: any, onUploadProgress:
    (progressEvent: ProgressEvent) => void) => {
    // 该接口要求的请求数据类型是：multipart/form-data
    // 所以需要提交 FormData 数据对象
    return request({
        method: 'POST',
        url: '/boss/course/upload',
        data,
        onUploadProgress
        // h5新增上传响应事件：progress
        // onUploadProgress (e) { // 关于进度的属性
        //     // console.log(e.loaded) // 已上传的数据大小
        //     // console.log(e.total) // 上传文件的总大小
        //     Math.floor(e.loaded / e.total * 100)
        // }
    })
}
