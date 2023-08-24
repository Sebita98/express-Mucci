//const ProductDaoMongo = require('../dao/Mongo/product.mongo.js')
const { ProductDao } = require("../dao/factory");

// const UserDaoMongo = require('../dao/Mongo/User.mongo.js')
// const CartDaoMongo = require('../dao/Mongo/Cart.mongo.js')
const { ProducRepository } = require("../repositories/products.repository");
// este archivo es ideal para aplicar el patron repository

const productService = new ProducRepository(new ProductDao())
// const productService = new ProductDaoMemory()
// const userService = new UserDaoMongo()
// const cartService = new CartDaoMongo()

module.exports = {
    productService,
    // userService,
    // cartService,
}