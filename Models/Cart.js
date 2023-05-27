const {model, Schema} = require ("mongoose")

const CartSchema = new Schema ({
    name: {type: String, required: true, unique: true},
    img: {type: String, required: true},
    account: {type: String, required: true},
    price: {type: String, required: true},
})

module.exports = model("cart", CartSchema)