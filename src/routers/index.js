const Router = require('koa-router')
const userRouter = require('./user')
const ledRouter = require('./led')

const router = new Router()

router.use('/user', userRouter.routes())
router.use('/led', ledRouter.routes())

module.exports = router
