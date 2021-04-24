const path = require('path')
const fs = require('fs-extra')
const dotenv = require('dotenv')

const cwd = process.cwd()
const envFilePaths = ['.db.env', '.env'].map(p => path.resolve(cwd, p))

for (const fp of envFilePaths) {
    try {
        const envConfig = dotenv.parse(fs.readFileSync(fp))
        for (const k in envConfig) {
            process.env[k] = envConfig[k]
        }
    } catch (error) {
        console.error(error)
        continue
    }
}
