// const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')
const MongoSingleton = require('./MongoSingleton')
const {connect} = require("mongoose")
require('dotenv').config()

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
    google_mail_password: process.env.GOOGLE_MAIL_PASSWORD,
    google_mail_user:     process.env.GOOGLE_MAIL_USER,
    PORT: process.env.PORT || 8000,
    MONGO_URL: process.env.MONGO_URL || '',
    persistence: process.env.PERSISTENCE,
    connectDB: () => MongoSingleton.getInstance()
    
}



const mongo_url = process.env.MONGO_URL || 'mongodb://localhost:27017/comision32270'
// console.log('mongo_url: ', mongo_url)
module.exports = {
    dbConection: async ()=>{
        try {
            const conectDB = await connect(mongo_url)
            console.log(`DB conected`)
        } catch (error) {
            console.log(error)
        }
    }
}

// defe014/imagen:version
// docker tag userscreator defe014/userscreator:1.0.0
// docker push defe014/userscreator:1.0.0

// kubectl
// curl.exe -LO "https://dl.k8s.io/release/v1.25.0/bin/windows/amd64/kubectl.exe"
// kubectl version --short

// minikube 
// https://minikube.sigs.k8s.io/docs/start/ -> descarga

// kubectl cluster-info