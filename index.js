const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

const serviceA = 'http://localhost:5001'
const serviceB = 'http://localhost:5002'
const serviceC = 'http://localhost:5003'

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`)
    next()
})

// SERVICE VIDEO TO AUDIO CONVERT
app.use('/service-a', createProxyMiddleware({
    target: serviceA,
    changeOrigin: true,
    pathRewrite: {
        '^/service-a': '/'
    }
}))

app.post('/convert-to-audio', createProxyMiddleware({
    target: serviceA,
    changeOrigin: true,
    pathRewrite: {
        '^/convert-to-audio': '/convert-to-audio'
    }
}))

// SERVICE PDF COMPRESS 
app.use('/service-b', createProxyMiddleware({
    target: serviceB,
    changeOrigin: true,
    pathRewrite: {
        '^/service-b': ''
    }
}))

app.post('/pdf-compress/', createProxyMiddleware({
    target: serviceB,
    changeOrigin: true,
    pathRewrite: {
        '^/pdf-compress/': '/pdf-compress/'
    }
}))

// SERVICE IMAGE COMPRESS
app.use('/service-c', createProxyMiddleware({
    target: serviceC,
    changeOrigin: true,
    pathRewrite: {
        '^/service-c': ''
    }
}))

app.post('/compress', createProxyMiddleware({
    target: serviceC,
    changeOrigin: true,
    pathRewrite: {
        '^/compress': '/compress'
    }
}))

const PORT = 3000

app.listen(PORT, () => {
    console.log(`API Gateway berjalan pada http://localhost:${PORT}`)
})