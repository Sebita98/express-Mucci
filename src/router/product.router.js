const {Router} =require('express')
const { productModel } = require('../managers/models/product.model.js')
const { passportCall } = require('../passport-jwt/passportCall.js')
const { authorization } = require('../passport-jwt/authorizationJwt.js')
const { getProducts } = require('../controllers/producs.controller.js')
const {ProductDaoMongo} = require ('../dao/Mongo/product.mongo.js')

const{
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/product.controller.js')

const router = Router()

router.get('/', passportCall('jwt'), authorization('Admin'), getProducts)
router.get('/:pid', getProduct)
router.post('/', createProduct)
router.put('/:pid', updateProduct)
router.delete('/:pid', deleteProduct)

router.get('/',productsController.getProducts)

router.get('/:pid', productsController.getProduct)

router.post('/', productsController.createProduct)

router.put('/:pid', productsController.updateProduct)

router.delete('/:pid', productsController.deleteProduct)

module.exports = router