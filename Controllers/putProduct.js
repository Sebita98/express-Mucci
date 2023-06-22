const Cart = require ("../models/cart")

const putProduct = async (req, res) =>{
    const { productId} = req.params
    const {query} = req.query
    const body = req.body


    const productBuscado = await Cart.findById (productId)

    if (!query){
        res.status(404).json({message: "Debes enviar una query"})

    }else if (productBuscado && query === "add") {
        body.amount = body.amount + 1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,

        }).then((product)=>{
            res.json({
                message: `El producto: ${product.name} fue actualizado`,
                product,
            })
        })
        
    }else if (productBuscado && query === "del"){
        body.amount = body.amount - 1;

        await Cart.findByIdAndUpdate(productId, body, {

        }).then((product)=>{
            res.json({
                message: `El producto: ${product.name} fue actualizado`,
                product,
            })
        })
    } else{
        res.status(800).json({message: "Ocurrio un error"})
    }
}

export default putProduct