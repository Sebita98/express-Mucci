const Cart = require ("../models/cart")
const Product = require ("../models/products")

const deleteProduct = async (req, res) => {
    const {productId} = req.params


    const ProductInCart = await Cart.findById(productId)

    const {name, img, price, _id} = await Product.findOne({
        name: ProductInCart.name,
    })

    await Cart.findByIdAndDelete(productId)

    await Product.findByIdAndUpdate (
        _id,
        {inCart: false, name,img, price},
        {new: true}
    )
    .then((product) =>{
        res.json({
            message: `El producto ${product.name} fue eliminado del carrito`,
        })
    })
    .catch((error) => res.json({message: "Hubo un error"}))
}

export default deleteProduct;