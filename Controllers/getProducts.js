const Product = required("../models/products")

const getProducts = async (req, res) => {
    const products = await Product.find()

    if(products){
        res.json({products})

    }else{
        res.json({message: "no hay productos"})
    }
}

export default getProducts;