const express = require("express")
const {ProductManager, Product, CartManager} = require("../data/data.js")
// const file = "products.json"

const app = express()
const port = 8080
const productsFile = "./data/products.json" // => No tocar
const cartsFile = "./data/products.json"
const prodManager = new ProductManager(productsFile)
const cartManager = new CartManager(cartsFile)


app.get("/", (req, res) => {
    res.end("Bienvenido a Mundo Tech! El mejor retail de tecnologia")
    
})

app.get("/api/products", async (req, res) => {
    try{
        // Obtengo los productos desde el archivo products.json
        const products = await prodManager.getProducts()
        res.json(products)
    }
    catch(err){
        console.log(`Error al obtener los productos: ${err.message}`)
    }
})
app.get("/api/products/:id", async (req, res) => {
    try{
        // Obtengo el producto con el id que me pasan por parametro
        const id = Number(req.params.id)
        const product = await prodManager.getProductById(id)
        if(!product){
            res.send(`Error: el producto con id ${id} no existe`)
        }
        res.json(product)

    }
    catch(err){
        console.log(`Error al obtener el producto: ${err.message}`)
    }
})
app.get("/api/carts/:cid", async (req, res)=> {
    try{
        const id = Number(req.params.cid)
        const cart = await cartManager.getCartById(id)
        if(!cart){
            res.send(`Error: el carrito con id ${id} no existe`)
        }
        res.json(cart)
    }
    catch(err){
        console.log(`Error al obtener el carrito: ${err.message}`)
    }
})

app.post("/products", (req, res) => {
    const product1 = new Product("Samsung A31", "Celular economico", 250, "SA31", [], true,22,"Celulares")
    const {name, price, thumbnail} = req.body
    if(!name || !price || !thumbnail){
        res.send("Error: falta algun campo")
    }
    else{
        const newProduct = {
            id: prodManager.getLastId() + 1,
            name,
            price,
            thumbnail
        }
        prodManager.addProduct(newProduct)
        res.json(newProduct)
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})