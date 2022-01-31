const express = require('express')

const config = require('./config/app.js')

const router = require('./router')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

const port = config.appPort

app.listen(port, () => {
    console.log('server listening on port:: ', port)
}) 