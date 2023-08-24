import server from "./app.js"
import {connect} from "mongoose";
const express = require('express')
const { UserModel } = require('./model/user.model')
const { dbConection } = require('./config/config')
require('dotenv').config()

const port = process.env.PORT || 8080
const ready= () =>{
    console.log('server ready on port'+port);
    connect(process.env.LINK_MONGO)
    .then(()=>console.log('connected to database'))
    .catch(err=>console.log(err))
}

server.listen(port,ready)

// const express = require('express')
const express                = require('express')
// const usersRouter         = require('./src/routes/users.router.js') 
const appRouter              = require('./routes')  
const { initializePassport } = require('./utils/passport-jwt/passport.config')
const { config }             = require('./config/config.js')
const passport               = require('passport')
const cors                   = require('cors')

// console.log(config)
const app = express()
config.connectDB()
const PORT = config.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

initializePassport()
app.use(passport.initialize())
app.use(addLogger)

app.use(appRouter)

app.use(errorMiddleware)

app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Todo mal')
})

const httpServer = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto: ${PORT}`)
})

// socket io

// jwt o session 



app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConection()

app.get('/api/user', async (req, res) =>{    
    try {  
        const { limit=5, page=1 }= req.query
        // console.log('limit: ', limit)
        // console.log('page: ', page)
        const result = await UserModel.paginate({}, {limit, page})           
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        console.log(error) 
    }
})

app.post('/api/user', async (req, res) =>{
    //mada el  cliente request 
    try {
        let {first_name, last_name, email, password } = req.body

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send({ 'error': error})
        }           

        let result= await UserModel.create({            
                        first_name,
                        last_name,
                        email,
                        password
                    })
    
        res.status(201).send({ 
            status: 'success',
            payload: result
        })
        
    } catch (error) {
        console.dir(error)            
    }
        
    
})



app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
})