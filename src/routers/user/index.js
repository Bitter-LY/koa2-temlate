const Router = require('koa-router')
const { userInfo } = require('../../controllers/user')

const userRouter = new Router()

userRouter.get('/info', userInfo)

module.exports = userRouter
