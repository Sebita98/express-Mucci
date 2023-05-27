const express = require ("express");
const cors = require("cors")

const db= require("./Database")
const controllers = require("./Controllers")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/products", controllers.getProducts)
app.get("/products-cart", controllers.getProductsCart)

app.post("/products-cart", controllers.addProductsCart)

app.put("/products-cart/:productId", controllers.putProduct)

app.delete("/products-cart/:productId", controllers.deleteProduct)

app.listen(8080, ()=> {
    console.log("server funcionando en el puerto 8080");
})

module.exports = app;