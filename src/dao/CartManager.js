const fs = require("fs")

// clase CartManager
class CartManager {
    constructor(path) {
        this.path = path
        this.carts = []
    }
    async getCart(id){
        try{
            if(fs.existsSync(this.path)){
                const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
                
                const cart = data.find(cart => cart.id === id)

                if(!cart){
                    return `No se encontró el carrito con el id ${id}`
                }
                return cart
            }            
        }
        catch(err){ console.log(err) }
    }
    async getCarts(){
        try{
            if(fs.existsSync(this.path)){
                const data = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
                return data
            }
        }
        catch(err){ console.log(err) }
    }
    async addCart(){
        try{
            const carts = await this.getCarts()
            const newCart = { id: carts.length + 1, products:[]}

            carts.push(newCart)
            await fs.writeFile(this.path, JSON.stringify(carts, null, 5), (e) => console.log(e))
            console.log("Carrito agregado exitosamente")
        }
        catch(err){ console.log(err) }
    }
    async addProductToCart(idCart, idProd, units){
        try{
            const carts = await this.getCarts()
            console.log(typeof(carts))
            
            const cart = carts.find(c => c.id === idCart)
            
            if(cart){
                const index = carts.indexOf(cart)
                const newProduct = { 
                    product: idProd, 
                    quantity: units
                }
                cart.products.push(newProduct)
                
                const updatedCart = { ...cart }
                carts[index] = updatedCart
                await fs.writeFile(this.path, JSON.stringify(carts, null, 5), (e) => console.log(e))
                console.log(`Producto agregado con exito al carrito de id ${idCart}`)
            }      
        }
        catch(err){
            console.log(err)
        }
    }
}
const file = "../data/carts.json";
const manager = new CartManager(file)

const app = async () => {
    // Creo un carrito nuevo
    
    // await manager.addCart()
        
    // await manager.addProductToCart(2, 1, 36)
    console.log(await manager.getCart(1))
}


module.exports = {
    CartManager
}