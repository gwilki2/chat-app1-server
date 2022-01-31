const express = require('express')
const router = express.Router()
const { loginSqlz, registerSqlz, login, register } = require('../controllers/authController')
const { validate } = require('../validators')
const { rules: registrationRules} = require('../validators/auth/registrationRules')
const { rules: loginRules} = require('../validators/auth/loginRules')

router.post('/login', loginRules, validate, login)
router.post('/register', registrationRules, validate, register)

router.post('/login-sqlz', loginRules, validate, loginSqlz)
router.post('/register-sqlz', registrationRules, validate, registerSqlz)

module.exports = router