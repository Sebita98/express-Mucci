import {model, Schema} from "mongoose"

const CartSchema = new Schema ({
    name: {type: String, required: true, unique: true},
    img: {type: String, required: true},
    inCart: {type: Boolean, default: false},
    price: {type: Number, required: true},
})

export default model("product", CartSchema)