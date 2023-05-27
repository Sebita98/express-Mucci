const Cart = require ("../Models/Cart")
const Product = require("../Models/Products")

const addProductCart = async (req,res) =>{
    const {name, img, price} = req.body;

    const estaEnProducts = await Product.findOne({name})

    const noEstaVacio = name !== "" && img !== "" && price !== ""

    const estaEnElCarrito = await Cart.findOne({name})

    if(estaEnProducts){
        res.status(800).json({
            messaje: "Este producto no se encuentra en nuestra base de datos"
        })

    }else if (noEstaVacio && !estaEnElCarrito){
        const newProductInCart = new Cart ({ name, img, price, amount: 1})

        await Product.findeByAndUpdate(
            estaEnProducts?._id,
            { inCart: true, name, img, price},
            {new: true}
        )
        .then((product)=>{
            newProductInCart.save()
            res.json({
                mensaje: `El producto fue agregado al carrito`,
                product,
            })
        })
        .catch((error) => console.error(error));

    }else if (estaEnElCarrito){
        res.status(800).json({
            message: "El producto ya esta en el carrito",
        })
    }
}

module.exports = addProductCart