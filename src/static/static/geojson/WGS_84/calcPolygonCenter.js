const json = require('./he_dao_shui_yu_mian.json') // 输入geojson
const fs = require('fs')
const path = require('path')

// 输出geojson路径
const writePath = path.resolve(__dirname, 'he_dao_shui_yu_mian.js')

// 中心
function getCenterOfGravityPoint(mPoints) {
  const len = mPoints.length
  let tx = 0
  let ty = 0

  for (const item of mPoints) {
    tx += item[0]
    ty += item[1]
  }

  return [tx / len, ty / len]
}
// 重心
function getCenterOfGravityPoint1(list) {
  let area = 0.0 //多边形面积
  let y = 0.0
  let x = 0.0 // 重心的x、y
  const len = list.length

  for (let i = 1; i <= len; i++) {
    let iLat = list[i % len][1]
    let iLng = list[i % len][0]
    let nextLat = list[i - 1][1]
    let nextLng = list[i - 1][0]
    let temp = (iLat * nextLng - iLng * nextLat) / 2.0
    area += temp
    y += (temp * (iLat + nextLat)) / 3.0
    x += (temp * (iLng + nextLng)) / 3.0
  }

  y = y / area
  x = x / area

  return [x, y]
}

let result = []

try {
  json.features.forEach((e) => {
    const { NAME } = e.properties
    const { coordinates, type } = e.geometry
    const center =
      e.geometry.type !== 'Polygon'
        ? getCenterOfGravityPoint1(coordinates.flat(2))
        : getCenterOfGravityPoint1(coordinates[0])

    e.properties.center = center

    result.push({
      center,
      name: NAME,
      type
    })
  })
} catch (error) {
  console.error(error.message)
}

try {
  fs.writeFileSync(writePath, 'export default ' + JSON.stringify(result))
} catch (error) {
  console.log('writeFileSync错误: ', writePath, error.message)
}
