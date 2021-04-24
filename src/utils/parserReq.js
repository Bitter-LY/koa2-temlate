function parserReq(ctx) {
    const { method, url } = ctx.request
    const userAgent = ctx.header['user-agent']

    return {
        method,
        url,
        userAgent
    }
}

function logTmp(ctx) {
    const { method, url, userAgent } = parserReq(ctx)
    return `${method}		${url}		${userAgent}`
}

module.exports = {
    parserReq,
    logTmp
}
