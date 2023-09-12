import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import 'dotenv/config.js'
import morgan from 'morgan'
import router from './router/index.js'
import error_handler from './middlewares/error.js'
import not_found_handler from './middlewares/notfound.js'
//import sessionFileStore from 'session-file-store'
import mongoStore from 'connect-mongo'
import passport from 'passport'
import inicializePassport from './config/passport.js'

const server = express()
const PORT = process.env.PORT || 8080
//const FileStore = sessionFileStore(expressSession)
//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE))
/* server.use(expressSession({
    store: new FileStore({ path: './src/data/sessions',ttl:10000,retries:0  }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
})) */
server.use(expressSession({
    store: mongoStore.create({ mongoUrl: process.env.LINK_MONGO,ttl:10000  }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))
server.use('/',express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(morgan('dev'))
inicializePassport()
server.use(passport.initialize())
server.use(passport.session())

//endpoints
server.use('/api',router)
server.use(error_handler)
server.use(not_found_handler)


app.use('/api/users',  usersRouter.getRouter())
app.use('/pruebas',  pruebasRouter)

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})

const httpServer = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto: ${PORT}`)
})

export default server





//todo lo de abajo es para la parte de seguridad!!!
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import usersRouter from './routes/users.router.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from './config/config.js';

const app = express();
const connection = mongoose.connect(config.mongo.URL)

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/',viewsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/users',usersRouter);

app.listen(8080,()=>console.log(`Listening on PORT 8080`))






//aca abajo toda la clase sobre documentacion de api
import mongoose from 'mongoose'


import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'
import adoptionsRouter from './routes/adoption.router.js'
import sessionsRouter from './routes/sessions.router.js'
import dotenv from 'dotenv'
// importar lo que instalamos de swagger
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import __dirname from './utils/index.js'

app.use(express.json())
app.use(cookieParser())
console.log(`${__dirname}/docs/**/*.yaml`)
const swaggerOptions = {
    definition: {
        openapi: '3.0.1', // conjunto de reglass 
        info: {
            title: 'Documentación de app de Adoptame',
            description: 'Api pensada para adopción de mascotas'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

console.log(swaggerJsDoc.definition)

const specs = swaggerJsDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use('/api/users',usersRouter)
app.use('/api/pets',petsRouter)
app.use('/api/adoptions',adoptionsRouter)
app.use('/api/sessions',sessionsRouter)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))