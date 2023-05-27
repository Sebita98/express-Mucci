import {Router }from "express";
import api_router from '../api/index.js'
import views_router from './index.js'




const router = Router()

router.use('/api', api_router)
//todas las rutas de la api rest va a tener el endpoint /api
router.use('/', views_router)
//todas las rutas de la api rest va a tener el endpoint / cart,product etc.

export default router
//erutador principal de la aplicacion
// aca solamente llama al enrutador de la api y al de las vistas