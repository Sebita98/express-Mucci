import express from 'express'
import 'dotenv/config.js'
import error_handler from './middlewares/error.js';
import not_found_handler from './middlewares/notfound.js';

const server = express()

server.use('/public', express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())


server.use(error_handler)
server.use(not_found_handler)

export default server