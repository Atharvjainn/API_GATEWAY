const express = require('express')
const app = express()
const rateLimit = require('express-rate-limit');
const axios = require('axios')
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

    app.use('/bookingservice',async(req,res,next) => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/isAuthenticated',{
            headers : {
                "x-access-token" : req.headers['x-access-token']
            }
        })
            console.log(response.data);
            next()
        } catch (error) {
            return res.status(401).json({
                message : "not authorised"
            })
        }
    })
    app.use('/bookingservice',createProxyMiddleware({target : "http://localhost:3002/",changeOrigin : true}))

    app.listen(PORT,() => {
        console.log("server started");
    })

}


startupserver()