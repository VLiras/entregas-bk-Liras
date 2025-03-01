const {Router} = require("express")
const {CartManager} = require("../dao/CartManager.js")
// const {} = require("../../data/carts.json")
const router = Router()

const cartsFile = './data/carts.json';
const cartManager = new CartManager(cartsFile);

router.get("/:cid", async (req, res)=> {
    try{
        const id = Number(req.params.cid)
        const cart = await cartManager.getCart(id)
        if(!cart){
            res.status(404).send(`Error: el carrito con id ${id} no existe`)
        }
        res.status(200).json(cart)
    }
    catch(err){
        res.status(500).send({message:`Error al obtener el carrito: ${err.message}`})
    }
})
// Agregar carrito 
router.post("/", async (req, res) => {
    try{
        const {products} = req.body
        const newCart = {
            // products: products.map(product => ({id: product.id, quantity: product.quantity})),
            products,
        }
        await cartManager.addCart(req.body)
        res.status(201).send(`El carrito se ha creado con exito`)
    }
    catch(err){
        res.status(500).send({message:`Error al obtener el carrito: ${err.message}`})
    }
})

router.post("/:cid/product/:pid", async (req, res) =>{
    try{
        const cid = Number(req.params.cid)
        const pid = Number(req.params.pid)
        if(isNaN(cid) || isNaN(pid)){
            res.status(400).send({message: `Error: id de carrito o del producto es invalido`})
        }
        const cart = await cartManager.getCart(cid)
        if(!cart){
            res.status(404).send({message:`Error: el carrito con id ${cid} no existe`})
        }
        // const product = await 
        
    }
    catch(err){
        res.status(500).send({message:`Error al agregar productos al carrito de id ${req.params.cid}: ${err.message}`})
    }
})

module.exports = router