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


const Users = require( "../dao/Users.dao.js")
const Pet = require( "../dao/Pets.dao.js")
const Adoption = require( "../dao/Adoption.js")

const UserRepository = require( "../repository/UserRepository.js")
const PetRepository = require( "../repository/PetRepository.js")
const AdoptionRepository = require( "../repository/AdoptionRepository.js")

exports.usersService = new UserRepository(new Users())
exports.petsService = new PetRepository(new Pet())
exports.adoptionsService = new AdoptionRepository(new Adoption())

module.exports = {
    productService,
    // userService,
    // cartService,
}