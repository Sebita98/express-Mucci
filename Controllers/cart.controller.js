const CartMongoDao= require("../dao/Mongo/cart.mongo.js")

//let cartService = new CartMemoryDao()
let cartService = new CartMongoDao()
class CartController{
    getCarts=(req,res)=>{
        let result = cartService.getCarts()
        res.send(result)
    }
    getCart=(req,res)=>{
        let result = cartService.getCart()
        res.send(result)
    }
    createCart=(req,res)=>{
        let result = cartService.createCart()
        res.send(result)
    }
    updateCart=(req,res)=>{
        let result = cartService.updateCartCarts()
        res.send(result)
    }
    deleteCart=(req,res)=>{
        let result = cartService.deleteCart()
        res.send(result)
    }

}

module.exports= new CartController()