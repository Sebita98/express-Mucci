import express from 'express'
import 'dotenv/config.js'
import error_handler from './middlewares/error.js';
import not_found_handler from './middlewares/notfound.js';
import morgan from 'morgan'
import session from 'express-session'
import mongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'

const server = express()



server.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 20000
    })

}))
server.use(cookieParser('clave_secreta'))
server.use('/', express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(morgan('dev'))
server.use(error_handler)
server.use(not_found_handler)

export default server