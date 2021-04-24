const { User } = require('../../models')
const user = new User()

async function userInfo(ctx) {
    const query = ctx.request.query
    const [data, error] = await user.getUserInfo(query)

    if (error) {
        ctx.body = {
            code: -1,
            data: null,
            msg: error.message
        }
        return false
    }

    ctx.body = {
        code: 0,
        data,
        msg: '用户信息获取成功'
    }
}

module.exports = userInfo
