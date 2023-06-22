import { Router } from "express"
const sessions_router = Router()

sessions_router.get('/', async (req, res) => {
    if (!req.session.counter) { req.session.counter = 1 }
    else { req.session.counter++ }
    return res.status(200).json({
        message: `han ingresado ${req.session.counter}usuarios`
    })
})

sessions_router.post('/login', async (req, res, next) => {
    try {
        const { email } = req.body
        req.session.email = email
        return res.status(200).json({
            succes: true,
            message: email + 'inicio sesion'
        })
    } catch (error) {
        next(error)
    }
})

sessions_router.post('/signout', async (req, res, next) => {
    try {
        req.session.destroy()
        return res.status(200).json({
            message: 'cerro sesion'
        })
    } catch (error) {
        next(error)
    }
})



export default sessions_router