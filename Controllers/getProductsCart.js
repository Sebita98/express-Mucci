const Product = require("../Models/Cart")

const getProductsCart = async (req, res) => {
    const productsCart = await Cart.find()

    if(productsCart){
        res.json({productsCart})

    }else{
        res.json({messaje: "no hay productos en el carrito"})
    }
}

module.exports = getProductsCart;