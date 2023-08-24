function pass_is_8(req,res,next){
    const{password} = req.body
    if(password.lenght >= 8){
        next()
    }
    return res.status(400).json({
        succes:true,
        message:'password must have at least 8 characteres'
    })
}

export default pass_is_8