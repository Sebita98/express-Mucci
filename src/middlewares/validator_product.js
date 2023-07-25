function validator(req,res,next){
    if(req.body.title|| !req.body.description ||  !req.body.stock || !req.body.price|| !req.body.url_photo ){
        return res.json({status:400,message:"complete all fields"})
    }else{
        next()
    }
}

export default validator