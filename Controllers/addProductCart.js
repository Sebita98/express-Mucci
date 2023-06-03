const Cart = required ("../models/cart")
const Product = required("../models/products")

const addProductCart = async (req,res) =>{
    const {name, img, price} = req.body;

    const estaEnProducts = await Product.findOne({name})

    const noEstaVacio = name !== "" && img !== "" && price !== ""

    const estaEnElCarrito = await Cart.findOne({name})

    if(estaEnProducts){
        res.status(800).json({
            message: "Este producto no se encuentra en nuestra base de datos"
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
                message: `El producto fue agregado al carrito`,
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

export default addProductCart