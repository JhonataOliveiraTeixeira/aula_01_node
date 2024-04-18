import { DataBase } from "./database.js"
import {randomUUID} from "node:crypto"
import { buildRoutPath } from "../utils/buILD_rout_path.js"


const database = new DataBase()

export const routes =[
    {
        method: "GET",
        path: buildRoutPath("/users"),
        handler: (req, res)=>{
            const users = database.select("users")

            return res
            .setHeader("Content-type", "application/json")
            .end(JSON.stringify(users))
        }
    },
    {
        method: "POST",
        path: buildRoutPath("/users"),
        handler: (req, res)=>{
            const { name, email} = req.body

            const user={
                id:randomUUID(),
                name,
                email,
            }
            database.insert("users", user)
    
            return res.writeHead(201).end()
        }
    },
    {
        method: "PUT",
        path: buildRoutPath("/users/:id"),
        handler:(req,res) =>{
            const id = req.params  
            const { name, email} = req.body
          

            database.update("users", id, {
                name,
                email,
            })

            return res.writeHead(204).end()
        },

    },
    {
        method: "DELETE",
        path: buildRoutPath("/users/:id"),
        handler:(req,res) =>{
            const id = req.params  
            database.delete("users", id )

            return res.writeHead(204).end()
        },

    }
]