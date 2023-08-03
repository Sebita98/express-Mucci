import {sign } from "jsonwebtoken"

export default (req,res,next)=>{
    let token = sign(
        {email:req.body.email},
        process.env.SECRET_JWT,
        {expireIn:60*60*24*7}
    )
    req.token=token
    return next()
}