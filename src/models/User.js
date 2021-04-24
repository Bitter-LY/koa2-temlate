const Joi = require('joi')

const userInfoSchema = Joi.object({
    id: Joi.number().min(1).required().error(new Error('参数id错误！'))
})

class User {
    getUserInfo(query) {
        return new Promise((resolve, _) => {
            try {
                const { value, error } = userInfoSchema.validate(query)

                if (error) {
                    resolve([null, error])
                    return false
                }

                // 假数据
                const data = [{}, { username: '123' }]
                resolve([data[value.id], null])
            } catch (error) {
                resolve([null, error])
            }
        })
    }
}

module.exports = User
