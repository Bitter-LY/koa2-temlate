const { Led } = require('../../models')
const { mqttServer, sendClientSubLED } = require('../../mqtt')
const led = new Led()

async function onOff(ctx) {
  const body = ctx.request.body
  const [data, error] = await led.sendOnOff(body)

  if (error) {
    ctx.body = {
      code: -1,
      data: null,
      msg: error.message
    }
    return false
  }

  sendClientSubLED(mqttServer, 'led/on_off', data)
  ctx.body = {
    code: 0,
    data,
    msg: '发送成功'
  }
}

module.exports = onOff
