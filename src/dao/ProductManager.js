const fs = require("fs")

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }
    async getProducts(){
        try{
            if(fs.existsSync(this.path)){
                    const products = await fs.promises.readFile(this.path, "utf-8")
                    return JSON.parse(products)
            }
            else{
                return new Error("El archivo no existe")
            }
        }
        catch(err){
            console.log(err)
        }
    }
    async getProductById(id){
        try{
            if(isNaN(id)){
                throw new Error("El id debe ser un numero")
            }
            const products = await this.getProducts()
            const product = products.find(p => p.id === id)
            return product
        }
        catch(err){
            console.log(err)
        }
    }
    async addProduct(product){
        try{    
            const products = await this.getProducts()
            let id = 1
            if(products.length >= 0){
                id = products.length + 1
            }

            products.push({id, ...product})
            await fs.writeFile(this.path, 
                JSON.stringify(products, null, 5), 
                (err) => {
                    if (err) throw err;
                }
            )
            return
        }
        catch(err){
            console.log(err)
        }
    }
    async updateProduct(id, data){
        try{
            const products = await this.getProducts()
            const productToUpdate = products.find((product) => product.id === id)
            if(productToUpdate){
                const index = products.indexOf(productToUpdate)
                const updatedProduct = {...productToUpdate, ...data}
                products[index] = updatedProduct
            }
            await fs.writeFile(this.path, JSON.stringify(products, null, 5), (e) => console.error(e))
            return;
        }
        catch(err){
            console.log(err)
        }
    }
    async deleteProduct(id){
        try{
            let products = await this.getProducts()
            const productToDelete = products.find((product) => product.id === id)
            if(productToDelete){
                products = products.filter(p => p.id !== id)
                await fs.writeFile(this.path, JSON.stringify(products, null, 5), (e) => console.error(e))
                return;
            }
            else{
                return new Error(`Error: producto no encontrado`)
            }
        }
        catch(err){
            console.log(err)
        }
    }
}

class Product {
    constructor(title, description, price, code, stock, thumbnails, status, category) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.status = status;
        this.stock = stock;
        this.category = category;
        this.thumbnails = thumbnails;
    }
}

/*
const app = async () => {
    const product1 = new Product("Samsung A31", "Celular economico", 250, "SA31", [], true,22,"Celulares")
    const product2 = new Product("Samsung S25", "Celular de alta gama", 1250, "SA25", [], true, 25, "Celulares")
    const product3 = new Product("Iphone 16 pro", "Celular premium con fotos de alta resolucion",180, "IPH16", [], true, 16, "Celulares")
    await manager.addProduct(product1)
    await manager.addProduct(product2)
    await manager.addProduct(product3)

    console.log(await manager.getProducts())

    //Prueba para actualizar un producto
    await manager.updateProduct(1, {title: "Samsung A32", price:350, code:"SA32"})

    setTimeout(async () => {
        console.log(await manager.getProducts())
    }, 3000)
}
*/

module.exports = {
    ProductManager
}