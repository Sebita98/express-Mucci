import { collection, model, Schema, Types } from "mongoose"

let collection = 'carts'
const schema = new Schema({
    products: [{
        name: { type: Types.ObjectId, required: true, ref: 'users'},
        product: { type: Types.ObjectId, required: true, ref: 'products' },
        quantity: { type: Number, required: true },
        active: { type: Boolean }
    }]
})

schema.pre(
    'find',
    function () {
        this.populate('user_id', 'name_id')
        this.populate('movie_id', 'title -_id')
    }
)
let cart = model(collection, schema)

export default cart