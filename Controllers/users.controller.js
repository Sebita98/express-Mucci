const { UserDTO } = require("../dto/user.dto")
const UserManagerMongo = require("../dao/Mongo/user.mongo")

const CustomError = require("../utils/error/customeError")
const { EErrors } = require("../utils/error/enums")
const { generateUserErrorsInfo } = require("../utils/error/generateInfoUser")


class UserController {
    constructor(){
        this.service = new UserManagerMongo() 
    }
    getUsers = async (req, res)=>{
        try {
            // mongoose - paginate 
            const {page=1} = req.query
            // let users = await userModel.paginate({}, {limit: 10, page: page, lean: true})
            let users = await this.service.get()
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = users
    
            // if (!docs) {
                
            // }
    
            res.send({
                status: 'success',
                users: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    createUsers = async (req, res, next)=>{
        try {
            let { first_name, last_name, email,  password  } = req.body // viene del cliente
            console.log(email)
            if(!first_name || !last_name || !email) { 
                CustomError.createError({
                    name: 'User creation error',
                    cause: generateUserErrorsInfo({first_name, last_name, email}),
                    message: 'Error trying to created user',
                    code: EErrors.INVALID_TYPE_ERROR
                })
            }
    
            // let newUser = new UserDTO({first_name, apellido, email, password})
            
            // let result =  await this.service.create(newUser)// error
    
            
            res.status(200).send({
                status: 'success',
                message: 'User created',
                payload: {first_name, last_name, email}
            })
        } catch (error) {
            next(error)
        }
        
    }
    
    updateUsers = async (req, res) => {
        const { uid } = req.params
        const user = req.body
    
        // validar pid 
        // if(!id)   
        // validar campos 
        if(!user.nombre || !user.apellido){ 
            return res.status(400).send({status:'error', mensaje: 'todos los campos son necesarios'})
        }
       
        let  userToReplace = {
            first_name: user.nombre,
            last_name: user.apellido,
            email: user.email
        }
    
        let result = await this.service.updateOne({_id: uid}, userToReplace)
        
    
        res.send({
            status: 'success',
            payload: result
        })
    }
    
    deleteUsers = async (req, res) => {
        try {
            let {uid} = req.params
            // buscar por pid user
        
            let result = await this.service.deleteOne({_id: uid})
            res.send({status: 'success', payload: result})
            
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController()
