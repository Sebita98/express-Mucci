import { Router } from "express"
import cart from "../models/cart.js"

const carts_router = Router()

//create
carts_router.post('/', async (req, res, next) => {
    try {
        let one = await cart.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'id=' + one._id
        })
    } catch (error) {
        next(error)
    }
})

carts_router.get('/', async (req, res, next) => {
    try {
        let all = await cart.find().select('user_id -_id')
            .populate('user_id', 'name -_id')
        return res.status(200).json({
            succes: true,
            response: all
        })
    } catch (error) {
        next(error)
    }
})

carts_router.get('/bills/:uid', async (req, res, next) => {
    try {
        let data = await cart.aggregate([
            { $match: { user_id: new Types.ObjectId(req.params.uid) } },
            { $lookup: { foreignField: '_id', from: 'users', localField: 'user_id', as: 'user_id' } },
            { $lookup: { foreignField: '_id', from: 'users', localField: 'user_id', as: 'user_id' } },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            { $arrayElemAt: ["$movie_id", 0] },
                            "$$ROOT"
                        ]
                    }
                }
            },
            { $set: { total: { $multiply: ['$quantity', '$sprice'] } } },
            { $project: { movie_id: 0, quantity: 0, price: 0, cpacity: 0, __v: 0 } },
            { $group: { _id: 'user:id', sum: { $sum: '$total' } } },
            { project: { _id: 0, user_id: '$_id', sum: '$sum' } },
            { $merge: { into: 'bills' } }
        ])
        return res.status(200).json({ success: true, response: data })

    } catch (error) {
        next(error)
    }
})


//read cart from one user
carts_router.get('/users/:uid', async (req, res, next) => {
    try {
        let all = await cart.find().select({ user_id: uid })
        return res.status(200).json({
            succes: true,
            response: all
        })
    } catch (error) {
        next(error)
    }
})


//update cart
carts_router.put('/:cid', async (req, res, next) => {
    try {
        const cid = req.params.cid
        const data = req.body
        const one = await cart.findByIdAndUpdate(
            cid,
            data,
            { new: true }
        ).populate('user_id', 'name -_id')
        return res.status(200).json({
            success: true,
            response: one
        })
    } catch (error) {
        next(error)
    }
})

//update cart from one user
carts_router.put('/:cid', async (req, res, next) => {
    try {
        const uid = req.params.uid
        const all = await cart.updateMany({ user_id: uid }, { active: false })       
        return res.status(200).json({
                success: true,
                response: all
            })
    } catch (error) {
        next(error)
    }
})

//destroy
carts_router.delete('/:cid', async (req, res, next) => {
    try {
        const cid = req.params.cid
        let one = await cart.deleteOne({ _id: cid })
        return res.status(200).json({
            success: true,
            response: one
        })
    } catch (error) {
        next(error)
    }
})

export default carts_router