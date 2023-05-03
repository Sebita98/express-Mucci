import express from 'express'
import manager from './products.js'

let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port:' + PORT);

server.listen(PORT, ready)
server.use(express.urlencoded({ extended: true }))

let index_route = '/'
let index_function = (req, res) => {
    let quantity = manager.get_products().lenght
    return res.send(`there are ${quantity} products`)
}
server.get(index_route, index_function)

let one_route = '/products/:id'
let one_function = (req, res) => {
    let parametros = req.params
    let id = Number(parametros.id)
    let one = manager.get_product(id)
    console.log(one);
    if (one) {
        return res.send({
            succes: true,
            product: one
        })
    } else {
        return res.send({
            succes: false,
            product: 'inexistente'
        })
    }

}
server.get(one_route, one_function)

let query_route = '/products'
let query_function = (req, res)=>{
    console.log(req.query);
    let quantity = req.query.quantity ?? 5
    let products = manager.get_products().slice(0,quantity) //array de productos que tengo que rebanar para que pagine segun la query qe envia el cliente
    if(products.lenght>0){
        return res.send({
            succes: true,
            products: products
        })
    }else{
        return res.send({
            succes: false,
            products: 'inexistente'
        })
    }
    
}
server.get(query_route, query_function)