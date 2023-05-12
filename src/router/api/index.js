import { Router, application } from "express";
import products_router from './products_js'
import products_router from './cart_js'

const api_router = Router()

api_router.use('/products', products_router)
api_router.use('cart', cart_router)

export default {api_router}
//erutador principal de la api (para enviar datos)
// aca llamo al erutador de los recursos(cart/products)
