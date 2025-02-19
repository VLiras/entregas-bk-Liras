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