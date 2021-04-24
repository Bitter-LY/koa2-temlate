const log4js = require('log4js')

log4js.addLayout('space', function () {
    return function (logEvent) {
        const { startTime, categoryName, data, level } = logEvent
        return `[${new Date(
            startTime
        ).toLocaleString()}]     [${level.levelStr}]     [${categoryName.toUpperCase()}]     ${data}`
    }
})

log4js.configure({
    appenders: {
        info: {
            type: 'file',
            filename: 'logs/info.log',
            layout: { type: 'space' },
            maxLogSize: 20480,
            backups: 10
        },
        error: {
            type: 'file',
            filename: 'logs/error.log',
            layout: { type: 'space' },
            maxLogSize: 20480,
            backups: 10
        },
        console: {
            type: 'stdout'
        }
    },
    categories: {
        development_info: {
            appenders: ['info', 'console'],
            level: 'all'
        },
        production_info: {
            appenders: ['info'],
            level: 'info'
        },
        development_error: {
            appenders: ['error', 'console'],
            level: 'all'
        },
        production_error: {
            appenders: ['error'],
            level: 'info'
        },
        default: {
            appenders: ['info', 'console'],
            level: 'all'
        }
    }
})

function getLogger(category) {
    return log4js.getLogger(`${process.env.NODE_ENV}_${category}`)
}

module.exports = {
    infoLogger: getLogger('info'),
    errorLogger: getLogger('error')
}
