import bcryptjs from 'bcrypt'



export default (req,res,next)=>{
    try{
        let db_password= req.user.db_password
        let form_password = req.body.db_password
        let compare = bcryptjs.compareSync(form_password.db_password)
        if(compare){
            return next()
        }else{
            return res.status(401).json({
                succes:false,message:"invalid credentials!"
            })
        }

    }catch(error){
        next(error)
    }
}