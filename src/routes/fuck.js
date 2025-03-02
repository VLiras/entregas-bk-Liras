const fs = require("fs")
const {ProductManager} = require("../dao/ProductManager.js")

const fuckManager = new ProductManager("./data/products.json")

async function name() {
    const data = await fuckManager.getProducts()
    console.log(data)
}
name()