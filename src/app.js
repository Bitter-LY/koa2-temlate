// 配置系统变量
require('./env')
const Koa = require('koa')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const routers = require('./routers')
const { infoLogger, errorLogger } = require('./log')
const { logTmp } = require('./utils/parserReq')
const path = require('path')
// mqtt
const { mqttServer } = require('./mqtt')

// 服务
const app = new Koa()

// 配置静态web服务的中间件
app.use(static(path.resolve(__dirname, './static/3dtiles/taizhou01')))
app.use(static(path.resolve(__dirname, './static/gridJson')))

// 解析请求体
app.use(bodyparser({ enableTypes: ['json'] }))

// 拦截错误、打印响应信息
app.use(async (ctx, next) => {
  try {
    const startTime = new Date().getTime()
    await next()
    const endTime = new Date().getTime()
    const resTime = endTime - startTime

    infoLogger.info(logTmp(ctx) + `     ${resTime}ms`)
  } catch (error) {
    ctx.status = 500
    ctx.app.emit('error', error, ctx)
  }
})

// 错误处理
app.addListener('error', (error, ctx) => {
  console.log(error)
  const { message, stack } = error
  errorLogger.error(logTmp(ctx) + `       ${stack || message}`)
})

// 挂载路由
app.use(routers.routes())
app.use(routers.allowedMethods())

// 开启服务
app.listen(3000, () => {
  console.info('服务器开启：http://localhost:3000')
  console.log('mqtt服务开启: 192.168.1.101:1883')
})
