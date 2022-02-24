const Joi = require('joi')

const sendLedOnOffSchema = Joi.object({
  ON_OFF: Joi.number().min(0).required().error(new Error('缺失参数ON_OFF或格式错误！'))
})

class Led {
  sendOnOff(query) {
    return new Promise((resolve, _) => {
      try {
        const { value, error } = sendLedOnOffSchema.validate(query)

        if (error) {
          resolve([null, error])
          return false
        }

        resolve([value, null])
      } catch (error) {
        resolve([null, error])
      }
    })
  }
}

module.exports = Led
