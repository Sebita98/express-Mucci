const Cart = require ("../Models/Cart")
const product = require ("../Models/Products")

const deleteProduct = async (req, res) => {
    const {productId} = req.params


    const ProductInCart = await Cart.findById(productId)

    const {name, img, price, _id} = await ProductInCart.findOne({
        name: ProductInCart.name,
    })

    await Cart.findByIdUpdate (
        _id,
        {inCart: false, name,img, price},
        {new: true}
    )
    .then((product) =>{
        res.json({
            menssage: `El producto ${product.name} fue eliminado del carrito`,
        })
    })
    .catch((error) => res.json({message: "Hubo un error"}))
}

module.exports = deleteProduct;