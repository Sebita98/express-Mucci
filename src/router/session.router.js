import { Router } from "express"
import auth from '../middlewares/auth.js'

const session_router = Router()
const jwt = require('jsonwebtoken')

class SessionRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], (req,res)=>{
            let user = {
                email: req.body.email,
                role: 'user_premiun'
            }
            let token = jwt.sign(user, 'CoderSecretClassRouter')
            res.sendSuccess({token})
        })
    }
}

session_router.post('/login', async (req,res)=>{
const{email, password} =req.body


const {password:pass, ...userDb} = await userModel.findOne({email})

if (!userDb) return res.send({status: 'error', message: 'no existe ese usuario, revisar'})


if (!isValidPassword(password,userDb)) return res.status(401).send({
    status: 'error',
    message:'el usuario o contraseña es incorrecta'

})
})

session_router.post('/login', (req,res)=>{
    res
    .cookie('token', valorToken,{
        expires:111111000000*30*60,
        httpOnly: true
    })
    .send('login')
})

//COUNTER
session_router.get('/',async(req,res)=> {
    if (!req.session.counter) {
        req.session.counter = 1
    } else {
        req.session.counter++
    }
    return res.status(200).json({ message: `han ingresado ${req.session.counter} usuarios`})
})
//LOGIN
session_router.post('/login',async(req,res,next)=> {
    try {
        const { mail } = req.body
        req.session.mail = mail
        return res.status(200).json({ message: `${req.session.mail} ha iniciado sesión`})
    } catch (error) {
        next()
    }
})
//PRIVATE
session_router.get('/private',auth, (req, res) => {
    return res.status(200).json({ message: 'administrador autorizado' })
})
//LOGOUT
session_router.post('/logout',async(req,res,next)=> {
    try {
        req.session.destroy()
        return res.status(200).json({ message: `ha cerrado sesión`})
    } catch (error) {
        next()
    }
})

export default session_router