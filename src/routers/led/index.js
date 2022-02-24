const Router = require('koa-router')
const { onOff } = require('../../controllers/led')

const ledRouter = new Router()

ledRouter.post('/onOff', onOff)

module.exports = ledRouter
