import express from 'express'
import router from './routes/index_router.js'
import errorHandler from './middlewares/errorHandler.js';
import not_found_handler from './middlewares/not_found.js';
import { engine } from 'express-handlebars'
import {_dirname} from './utils.js'


let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port:' + PORT);

server.engine('handlebars', engine())
server.set('view engine', 'handlebar')
server.set('views', __dirname+'/views')
server.listen(PORT, ready)
server.use('/public', express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use('/', router)
server.use(errorHandler)
server.use(not_found_handler)