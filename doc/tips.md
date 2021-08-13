## This Doc

##### 预期的任务

-   主题切换
-   优化 SSR 模式的打包方式

##### 存在的问题

-   SSR 模式下开发时构建较慢
    -   好像还越来越卡了（(灬 ꈍ ꈍ 灬)）
-   SSR 时通过 store.js 中间件获取的数据在传递给 App 组件时, 实际上是通过 node 的 gobal.window 传递的(这可能是一个不好的设计)
-   SSR 模式下, 需要在路由配置中指定需要返回的 store-key
-   Redux/React-Redux 目前的接入/使用流程还是比较繁琐
