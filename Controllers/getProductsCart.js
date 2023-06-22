const Product = require("../models/cart")

const getProductsCart = async (req, res) => {
    const productsCart = await Cart.find()

    if(productsCart){
        res.json({productsCart})

    }else{
        res.json({message: "no hay productos en el carrito"})
    }
}

export default getProductsCart;