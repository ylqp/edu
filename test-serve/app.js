const express = require('express')
const path = require('path')
// 代理中间件
// const { createProxyMiddleware } = require('http-proxy-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()

// 托管了 dist 目录，当访问 / 的时候，默认会返回托管目录中的 index.html 文件
app.use(express.static(path.join(__dirname, '../dist')))

// 使用代理
app.use('/boss', createProxyMiddleware({
    target: 'http://eduboss.lagou.com',
    changeOrigin: true
}))
app.use('/front', createProxyMiddleware({
    target: 'http://edufront.lagou.com',
    changeOrigin: true
}))

// 添加一个路由
app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(3000, () => {
    console.log('running....')
})