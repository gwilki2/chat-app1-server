const { body } = require('express-validator')

exports.rules = [
    body('email').isEmail()
]