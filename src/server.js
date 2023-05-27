import express from 'express'
import router from './routes/index_router.js'
import errorHandler from './middlewares/errorHandler.js';
import not_found_handler from './middlewares/not_found.js';
import { engine } from 'express-handlebars'
import { _dirname } from './utils.js'
import { Server } from "socket.io";


let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port:' + PORT);

server.engine('handlebars', engine())
server.set('view engine', 'handlebar')
server.set('views', __dirname + '/views')
server.listen(PORT, ready)
server.use('/public', express.static('public'))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use('/', router)
server.use(errorHandler)
server.use(not_found_handler)
const http_server = server.listen(PORT, ready)
const socket_server = new Server(http_server)
socket_server.on('conecction', socket => {
    //  console.log(socket.client.id);
    socket.on("auth", () => {
        socket.emit("allMessagess", chats)
    })
    socket.on("new_message", (data) => {
        chats.push(data);
        console.log(chats);
        socket_server.emit("allMessagess", chats)
    })
})