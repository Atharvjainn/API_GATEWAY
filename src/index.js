const express = require('express')
const app = express()
const { createProxyMiddleware } = require('http-proxy-middleware');
const { PORT } = require('./config/serverconfig')
const morgan = require('morgan')



const startupserver = async() => {

    app.use(morgan('combined'))
    app.use('bookingservice',createProxyMiddleware({target : "http:"
        
    }))

    app.listen(PORT,() => {
        console.log("server started");
    })
}


startupserver()