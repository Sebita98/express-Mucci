import { Router } from "express";

const product_router = Router()

product_router.get('/',(req,res, next)=>{
    try{
        res.json({status:'ok'})

    }catch(error){
        next(error)
    }
})

product_router.delete()

let index_route = '/'
let index_function = (req, res) => {
    let quantity = manager.get_products().lenght
    return res.send(`there are ${quantity} products`)
}
product_router.get(index_route, index_function)

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
product_router.get(one_route, one_function)

let query_route = '/products'
let query_function = (req, res) => {
    console.log(req.query);
    let quantity = req.query.quantity ?? 5
    let products = manager.get_products().slice(0, quantity) //array de productos que tengo que rebanar para que pagine segun la query qe envia el cliente
    if (products.lenght > 0) {
        return res.send({
            succes: true,
            products: products
        })
    } else {
        return res.send({
            succes: false,
            products: 'inexistente'
        })
    }

}
product_router.get(query_route, query_function)

products: 'inexistente'

product_router.post(
    '/products',
    async (req, res) => {
        try {
            let name = req.body.name ?? null
            let description = req.body.description ?? null
            let price = req.body.price ?? null
            let stock = req.body.stock ?? null
            let image = req.body.image ?? null
            if (name && description && price && stock && image) {
                let product = await manager.add_product({ name, description, price, stock, image })
                return res.json({
                    status: 201,
                    product_id: product.id,
                    message: 'Created'
                })
            } else {
                return res.json({
                    status: 400,
                    message: 'Check params!'
                })
            }

        } catch (error) {
            console.log(error);
            return res.json({
                status: 500,
                message:'error'
            })
        }
    }
)

product_router.put(
    '/products/:pid',
    (req, res) => {
        if (req.body&&req.params.pid){
            let id = Number (req.params.pid)
            let data = req.body
            manager.update_product(id, data) 
            return res.json({
                status: 200,
                message: 'updated!'
            })
        }else{
            return res.json({
                status: 400,
                message: 'check data!'
            })
        }    
    }
    //en este caso no necesito esperar la actaulizacion, debido a que los datos de la actualizacion no se utilizan para operar o enviar al cliente en la respuesta. por eso no necesito una async
)

export default product_router