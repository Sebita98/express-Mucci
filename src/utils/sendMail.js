const nodemailer = require('nodemailer')
const { config } = require('../config/config.js')
const { createTransport } = require('nodemailer')
const { config: {google_mail_password, google_mail_user} } = require('../config/config')




const sendMail = async (userMail, subject, html)=>{
    return await transport.sendMail({
        from: `<Servicion de email ${google_mail_user}>`,
        to: userMail,
        subject,
        html
    })
}


const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmail_user_app,
        pass: config.gmail_pass_app,
        user: google_mail_user,
        pass: google_mail_password
    }
})

exports.sendMail = async () => {
    
    return await transport.sendMail({
        from: 'Coder Test <projectodigitalgen@gmail.com>',
        to: 'projectodigitalgen@gmail.com',
        subject: 'Correo electrónico de prueba',
        html: `<h1>ESto es un correo de prueba</h1>`,
        attachments: [{
            filename: 'nodejs.png',
            path: __dirname+'/nodejs.png',
            cid: 'nodejs'
        }]
    })
}

module.exports = { sendMail }