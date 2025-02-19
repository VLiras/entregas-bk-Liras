const fs = require("fs");
class UserManager {
    constructor(path) { 
        this.path = path
        this.users = [];
    }
    async getUsers(){
        
            if(fs.existsSync(this.path)){
                return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
            }
            else{
                return data
            }
    }
    async addUser(name, age){
        let users = await this.getUsers()
        
        let id = 1
        
        
        if(users.length > 0){
            // id = Math.max(...users.map(d => d.id))
            id = users.length + 1
        }

        let newUser = {
            id, 
            name, age
        }
        // Metodo para evitar repetir usuarios
        if(users.find(user => user.name === name)){
            console.log("El usuario ya existe")
            return
        }
        users.push(newUser)
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"))
        return `Usuario agregado exitosamente`
    }
    async getUsersByid(id){
        let users = await this.getUsers()
        return`Usuario buscado:${users.find(user => user.id === id)} ` 
    }
    async deleteUser(id){
        let users = await this.getUsers()
        users = users.filter(user => user.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, "\t"))
        return
    }
}

const app = async () => {
    const userManager = new UserManager("users.json");
    const user1 = await userManager.addUser("Juan", 30);
    // const user2 = await userManager.addUser("Matias", 24);
    // const user3 = await userManager.addUser("Jose", 19);
    setTimeout(async () => {
        console.log(await userManager.getUsers())
    }, 2000)

    console.log( await userManager.getUsersByid(2))

    console.log(await userManager.deleteUser(4))
}