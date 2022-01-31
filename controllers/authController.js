const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

const generateToken = user => {
    delete user.password

    const token = jwt.sign(user, config.appKey, { expiresIn: 86400 })
    
    return { ...user, token }
}

exports.loginSqlz = async (req, res) => {
    console.log('in login controller')
    const { email, password } = req.body
    
    try {
        //find the user
        const user = await User.findOne({
            where: {
                email
            }        
        })

        //check if user found
        if(!user) return res.status(404).json({message: 'User not found'})
        
        //check if password matches
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({message: 'Incorrect Password'})
        
        //generate auth token
        const userWithToken = generateToken(user.get({raw: true})) //.get is needed to convert the Sequalize version of user converted to a POJO (plain old javascript object)
        console.log(userWithToken)
        
        return res.send(userWithToken)
        
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
    
}
exports.registerSqlz = async (req, res) => {

    try {
        const user = await User.create(req.body)

        const userWithToken = generateToken(user.get({raw: true})) //.get is needed to convert the Sequalize version of user converted to a POJO (plain old javascript object)
        
        return res.send(userWithToken)
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
    //const {email, password} = req.body
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    return res.send([email, password])
}
exports.register = async (req, res) => {
    //const {email, password} = req.body
}