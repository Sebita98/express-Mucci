const Product = require("../Models/Products")

const getProducts = async (req, res) => {
    const products = await Product.find()

    if(products){
        res.json({products})

    }else{
        res.json({messaje: "no hay productos"})
    }
}

module.exports = getProducts