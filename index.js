const express = require('express')

const config = require('./config/app.js')

const app = express()


app.get('/home', (req, res) => {
    return res.send('home screen')
})
app.get('/login', (req, res) => {
    return res.send('login screen')
})
const port = config.appPort

app.listen(port, () => {
    console.log('server listening on port: ', port)
})