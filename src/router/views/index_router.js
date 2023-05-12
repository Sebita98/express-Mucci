import {Router }from "express";
import api_router from '../api/index.js'
import view_router from '../views/index.js'

const index_router = Router()


index_router.use('/', api_router)
//todas las rutas de la api rest va a tener el endpoint /api
index_router.use('/', view_router)
//todas las rutas de la api rest va a tener el endpoint / cart,product etc.

export default index_router
//erutador principal de la aplicacion
// aca solamente llama al enrutador de la api y al de las vistas