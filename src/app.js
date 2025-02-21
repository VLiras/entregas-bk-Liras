const express = require("express")
const {ProductManager} = require("../dao/ProductManager.js")
const {CartManager} = require('../dao/CartManager.js')


const app = express()
const port = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Ruta archivos
const productsFile = "./data/products.json" // => No tocar
const cartsFile = "./data/carts.json"

// Managers
const prodManager = new ProductManager(productsFile)


// App
app.get("/", (req, res) => {
    res.status(200).send({message:"Bienvenido a Mundo Tech! El mejor retail de tecnologia"})
})

app.get("/api/products", async (req, res) => {
    try{
        const products = await prodManager.getProducts()
        res.json(products)
    }
    catch(err){
        res.status(500).send(`Error al obtener los productos: ${err.message}`)
    }
})

app.get("/api/products/:id", async (req, res) => {
    try{
        const id = Number(req.params.id)
        const product = await prodManager.getProductById(id)
        if(!product){
            res.status(404).send({message:`Error: el producto con id ${id} no existe`})
        }
        res.json(product)

    }
    catch(err){
        res.status(500).send(`Error al obtener el producto: ${err.message}`)
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

app.post("/api/products",async (req, res) => {
    try{
        const {title, description,code,price,status, stock, category, thumbnails} = req.body
        
        // Validaciones
        if(!title || !description || !code || !price || !status || !stock || !category){
            res.status(400).json({message: "Falta completar campos"})
        } 
        
        // Agregado del producto
        await prodManager.addProduct(req.body)

        res.status(201).send('El producto se ha creado exitosamente')
    }
    catch(err){
        res.status(500).send(`Error al agregar el producto: ${err.message}`)
    }
})

// Metodo put para actualizar un producto 
app.put("/api/products/:id", async (req, res) => {
    try{
        const id = Number(req.params.id)

        if(isNaN(id)){
            res.status(400).json({message: "El id es invalido"})
        }

        const product = await prodManager.getProductById(id)

        if(!product){
            res.status(404).send(`Error: el producto con id ${id} no existe`)
        }

        // Actualización del producto
        await prodManager.updateProduct(id, req.body)
        res.status(200).send('El producto se ha actualizado con exito')
    }
    catch(err){
        res.status(500).send({message: `Error al actualizar el producto de id ${req.params.id}: ${err.message}`})
    }
})

// Metodo delete para eliminar un producto 
app.delete("/api/products/:id", async (req, res) => {
    try{
        const id = Number(req.params.id)
        if(isNaN(id)){
            res.status(400).json({message: "Error: el id es invalido"})
        }
        const product = await prodManager.getProductById(id)
        if(!product){
            res.status(404).send({message:`Error: el producto con id ${id} no existe`})
        }
        await prodManager.deleteProduct(id)
        res.status(200).send('El producto se ha eliminado con exito')
    }
    catch(err){
        res.status(500).send({message: `Error al eliminar el producto de id ${req.params.id}: ${err.message}`})
    }
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})