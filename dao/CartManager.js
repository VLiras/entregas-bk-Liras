const fs = require("fs")
// clase CartManager
class CartManager {
    constructor(path) {
        this.path = path
        this.carts = []
    }
    async getCarts() {
        try{
            if(fs.existsSync(this.path)){
                const data = await fs.readFile(this.path, 'utf8')
                this.carts = JSON.parse(data)
                return this.carts
            }
            else{
                return `El archivo de ruta ${this.path} no existe`
            }
        }
        catch(err){ console.log(err) }
    }
    async getCartById(id){
        try{
            const carts = await this.getCarts()
            const cart = carts.find((cart) => cart.id === id)
            if(!cart){ return new Error("El carrito no existe") }
            return cart
        }
        catch(err){ console.log(err) }
    }
    async addCart(products){
        try{
            const carts = await this.getCarts()
            if(!Array(products)){return new Error (`Ingrese un array de productos valido`)}
            const newCart = { id: carts.length + 1, products:products}
            carts.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(carts, null, 5), (e) => console.log(e))
            console.log("Carrito agregado exitosamente")
        }
        catch(err){ console.log(err) }
    }
}


class Cart {
    constructor(id, path){
        this.id = id
        this.path = path
        this.products = []
    }
    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                let products = await fs.promises.readFile(this.path, 'utf-8')
                if(products.length === 0){
                    console.log(`El carrito esta vacio`)
                    return
                }
                return JSON.parse(products)
            }
        }
        catch(error){
            console.log(`Error al obtener los productos del carrito ${this.id}`)
        }
    }
    async addProduct(){
        // Add product to cart
        try{
            let products = await this.getProducts()

        }
        catch(err){
            console.log(`Error al agregar productos al carrito`)
        }
    }
}

module.exports = {
    CartManager
}