const {Router} = require("express")
const {ProductManager} = require("../dao/ProductManager.js")
// const {} = require("./../../data/products.json")

const router = Router()

const productsFile = './data/products.json';

const prodManager = new ProductManager(productsFile)

router.get("/", async (req, res) => {
    try{
        const products = await prodManager.getProducts()
        
        res.setHeader('Content-Type','application/json');
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).send({message:`Error al obtener los productos: ${err.message}`})
    }
})

router.get("/:id", async (req, res) => {
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

router.post("/",async (req, res) => {
    try{
        const {title, description,code,price,status, stock, category} = req.body
        
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router