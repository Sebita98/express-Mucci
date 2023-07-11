//const fs = require('fs')
import fs from 'fs'
const { productModel } = require("./models/product.model")


class ProductManagerMongo {
    
    async getProducts(){
        try{
            return await productModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    
    async getProductById(pid){
        try {            
            return await productModel.findOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }
    }

    async addProduct(newProduct){
        try {            
            return await productModel.create(newProduct)
        } catch (error) {
            return new Error(error)
        }
    }

    async updateProduct(pid){}
    async deleteProduct(pid){}
}

module.exports = new ProductManagerMongo


class ProductManager {
    constructor(path) {
        this.products = []     //para guardar en la memoria todos los productos
        this.path = path    //para guardar en la memoria la ruta del archivo
        this.init(path)     //para iniciar la instancia y crear el archivo en caso de no existir o cargar la memoria en caso de existir productos
    }
    init(path) {
        //verifico si existe el archivo
        let file = fs.existsSync(path)
        //console.log(file)
        if (!file) {
            //si no existe lo creo
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 'file created at path: '+this.path
        } else {
            //si existe cargo los productos en la memoria del programa
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }
    async add_product({ name,description,price,stock, image }) {
        try {
            //defino el objeto que necesito agregar al array
            let data = { name,description,price,stock, image }
            //si la memoria tiene productos
            if (this.products.length>0) {
                //busco el id del último elemento y le sumo 1
                let next_id = this.products[this.products.length-1].id+1
                //agrego la propiedad al objeto
                data.id = next_id
            } else {
                //en caso que no tenga: asigno el primer id
                data.id = 1
            }
            //agrego el objeto (product) a la memoria del programa
            this.products.push(data)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('id´s created product: '+data.id)
            return data
        } catch(error) {
            console.log(error)
            return 'error: creating product'
        }
    }
    get_products() {
        //console.log(this.products)
        return this.products
    }
    get_product(id) {
        let one = this.products.find(each=>each.id===id)
        //console.log(one)
        return one
    }
    async update_product(id,data) {
        //data es el objeto con las propiedades que necesito modificar del product
        try {
            //busco el product
            let one = this.get_product(id)
            //itero para modificar la propiedad correspondiente
            for (let prop in data) {
                //console.log(prop)
                one[prop] = data[prop]
            }
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('updated product: '+id)
            return 'updated product: '+id
        } catch(error) {
            console.log(error)
            return 'error: updating product'
        }
    }
    async destroy_product(id) {
        try {
            //saco el product
            this.products = this.products.filter(each=>each.id!==id)
            //console.log(this.products)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('delete product: '+id)
            return 'delete product: '+id
        } catch(error) {
            console.log(error)
            return 'error: deleting product'
        }
    }
}


let manager = new ProductManager('./data/products.json')

async function manage() {
    await manager.add_product({ name:'Reloj Tommy Hilfiger para hombre', description:'Tiene una elegante caja de acero de 43 mm y presenta una esfera con acabado de textura suave que combina perfectamente con la correa de nylon.', image: "../imgs/reloj1.jpg", price:84000, stock:[8] })
    await manager.add_product({ name:'Reloj Lacoste', description:'Con una nueva caja redondeada y facetada y un bisel con acabado mate, el reloj de tres manecillas se ofrece en una variedad de colores monocromáticos, incluido el clásico verde Lacoste.', image: "../imgs/reloj2.jpg", price:43000, stock:[11] })
    await manager.add_product({ name:'Reloj Tommy Hilfiger para mujer', description:'Con una nueva caja redondeada y facetada y un bisel con acabado mate, el reloj de tres manecillas se ofrece en una variedad de colores monocromáticos, incluido el clásico verde Lacoste.', image: "../imgs/reloj3.jpg", price:49000,stock:[7] })
    await manager.add_product({ name:'Reloj Swatch White Rebel de silicona', description:'Este reloj atemporal presenta una delicada pulsera de malla que le da una sensación elegante', image: "../imgs/reloj4.jpg", price:36000, stock:[10] })
    await manager.update_product(1,{ name:'Reloj Tommy Hilfiger para hombre' })
    await manager.update_product(2,{ name:'Reloj Lacoste', stock: ['11'] })
    await manager.update_product(3,{ price:49000 })
    await manager.destroy_product(1)
}
//manage()
export default manager