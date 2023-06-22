import {Router }from "express";
import auth_router from './auth.js'
import products_router from './products.js'
import carts_router from './carts.js'
import cookies_router from './cookie.js'



const router = Router()

router.use('/auth', auth_router)
//todas las rutas de la api rest va a tener el endpoint /api
router.use('/products', products_router)
router.use('/carts', carts_router)
router.use('/cookies', cookies_router)
//todas las rutas de la api rest va a tener el endpoint / cart,product etc.

export default router
//erutador principal de la aplicacion
// aca solamente llama al enrutador de la api y al de las vistas