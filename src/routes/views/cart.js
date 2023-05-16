import { Router } from "express";

const cart_router = Router

cart_router.get('/',(req,res)=> res.json({statusCode:200}))
// cart_router.post()
// cart_router.put()
// cart_router.delete()


export default cart_router