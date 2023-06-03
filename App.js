const express = required ("express");
const cors = required("cors")

const db = required("./database")
const controllers = required("./controllers")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/products", controllers.getProducts)
app.get("/products-cart", controllers.getProductsCart)

app.post("/products-cart", controllers.addProductCart)

app.put("/products-cart/:productId", controllers.putProduct)

app.delete("/products-cart/:productId", controllers.deleteProduct)

app.listen(8080, ()=> {
    console.log("server funcionando en el puerto 8080")
    db()
})

export default app;