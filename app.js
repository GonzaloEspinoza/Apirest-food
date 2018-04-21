'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const service =require('./routes/api/v1.0/service')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', service)
const port =  4000


app.listen(port,() => {
    console.log(`API RES corrienso el http://localhost:${port}`)
})