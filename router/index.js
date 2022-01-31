const express = require('express')
const router = express.Router()

router.get('/home', (req, res) => {
    return res.send('home screen')
})
router.use('/', require('./auth'))

module.exports = router