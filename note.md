#### public文件夹 纯静态资源 不被文件打包
#### .browserslistrc 浏览器兼容配置
#### .editorconfig 编辑器适配

### Token
access_token
    作用：获取需要授权的接口数据
expires_in
    作用：access_token 过期时间
refresh_token
    作用：刷新获取新的 access_token

方法一：在请求发起前拦截每个请求，判断 token 的有效时间是否已经过期， 若已过期，则将请求挂起，先刷新token后再继续请求

优点：在请求前拦截，能节省请求，省流量
缺点：

方法二：不在请求前拦截，而是拦截后的返回数据，先发起请求，接口返回过期后，先刷新token，再进行一次请求

优点：不需要额外的token过期字段 不用判断时间
缺点：会多消耗一次请求，耗流量 但是可以忽略不计 

推荐方法二

##发布部署
1. npm run build
