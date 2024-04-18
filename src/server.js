import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./middlewares/routes.js"

// Query parameters: URL Stateful => filtros, paginação, não-obrigatorios
//localhost:3333/users?/userid=1&name=Joans   {chave e valor } Informações não sensiveis

// Route parameters: Identifica um recurso 
//DELETE localhost:3333/users/1
//GET localhost:3333/users/1

// Request body: Envio de informações de um formulário (HTTPS)
//POST localhost:3333/users

const server = http.createServer(async(req, res)=>{
    const {method, url} = req

    await json(req,res)
    
    const route = routes.find(route=>{
        return route.method == method && route.path.test(url)
    })
    if (route){
        const routeParams = req.url.match(route.path)
        
        req.params = { ...routeParams.groups}


        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})
server.listen(3333)