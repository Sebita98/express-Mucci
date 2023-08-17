// const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')
const MongoSingleton = require('./MongoSingleton')

// console.log(commander.opts())
const { mode } = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

exports.config = {
    twilio_sid: process.env.TWILIO_SID,
    twilio_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_phone: process.env.TWILIO_PHONE_NUMBER,
    my_phone: process.env.MY_PHONE_NUMBER,
    gmail_user_app: process.env.GMAIL_USER_APP,
    gmail_pass_app: process.env.GMAIL_PASS_APP,
    privateKeyJwt: process.env.PRIVATE_KEY_JWT || '',
    PORT: process.env.PORT || 8000,
    MONGO_URL: process.env.MONGO_URL || '',
    persistence: process.env.PERSISTENCE,
    connectDB: () => MongoSingleton.getInstance()
    
}