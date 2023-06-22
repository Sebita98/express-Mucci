function validator (req,res,next){
    const{name,password,email} = req.body
    if(!name || !password || !email){
        return res.status(400).json({
            succes:false,
            message:'name,password,email are required'
        })
    }
}

export default validator