import { Router } from "express";
import movies_router from "./movies.js";
import pizzas_router from "./pizzas.js"
const cartsRouter = require ('./cart.router.js')
const productRouter = require ('./product.router.js')
import cookies_router from "./cookies.js"
import sessions_router from "./sessions.js"
import auth_router from "./auth.js";

const router = Router()

router.use('/auth',auth_router)
router.use('/movies',movies_router)
router.use('/pizzas',pizzas_router)
router.use('/api/carts',cartsRouter)
router.use('/api/products',productRouter)
router.use('/cookies',cookies_router)
router.use('/sessions',sessions_router)

router.get('/email',(req, res) => {
    sendMail('projectodigitalgen@gmail.com', 'CAmbio de pass', '<h1>Prueba Node </h1>')
    res.send('mail enviado');
})

export default router