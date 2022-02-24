const mosca = require('mosca')

const ascoltatore = {
  //using ascoltatore
  //type: 'mongo',
  //url: 'mongodb://localhost:27017/mqtt',
  //pubsubCollection: 'ascoltatori',
  //mongo: {}
}

// 被客户端订阅的 S
const clientSubLED = 'led/on_off'
// 被客户端订阅的 E

// 从客户端发布的 S
const clientPubLED = 'led/on_off_info'
// 从客户端发布的 E

const settings = {
  port: 1883,
  backend: ascoltatore
}

/**
 *
 * @returns {mosca.Server}
 */
function connect() {
  return new mosca.Server(settings, (e) => {
    console.log('server start:', e)
  })
}

/**
 *
 * @param {mosca.Client} client
 */
function clientConnected(client) {
  console.log('client connected', client.id)
}

/**
 *
 * @param {mosca.Server} server
 */
function ready() {
  console.log('Mosca server is up and running')
}

function handleClientPubLED(client, bufferData, info) {
  console.log(
    'from client publish:',
    bufferData.toString('utf8'),
    '====',
    info.clientId
  )
  server.publish({
    topic: sub_topic,
    qos: info.qos,
    payload: JSON.stringify(
      {
        code: 0,
        data: {
          from: 'nodejs'
        },
        message: 'ok'
      },
      client,
      () => {
        console.log('publish')
      }
    )
  })
}

/**
 *
 * @param {mosca.Server} server
 * @param {String} topic
 * @param {Object} payload
 */
function sendClientSubLED(server, topic, payload) {
  server.publish({
    topic,
    qos: 0,
    payload: JSON.stringify(payload)
  })
  console.log('send client sub: ', topic)
}

const server = connect()
server.on('clientConnected', clientConnected)
server.on('ready', ready)
server.subscribe(clientPubLED, handleClientPubLED)

module.exports = { mqttServer: server, sendClientSubLED }
