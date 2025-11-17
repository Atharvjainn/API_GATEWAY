const express = require('express')
const app = express()
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { PORT } = require('./config/serverconfig')
const morgan = require('morgan')

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 5 // limit each IP to 5 requests per windowMs
});


const startupserver = async() => {

    app.use(morgan('combined'))
    app.use(limiter)
    app.use('/bookingservice',createProxyMiddleware({target : "http://localhost:3002/",changeOrigin : true}))

    app.listen(PORT,() => {
        console.log("server started");
    })

}


startupserver()