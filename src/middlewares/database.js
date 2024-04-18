import fs from "node:fs/promises"

const dataBasePath = new URL('../db.json', import.meta.url)

//cd do linux

export class DataBase{
    #database = {}

    #persist(){
        fs.writeFile("db.json", JSON.stringify(this.#database))
    }

    select(table){
        const data = this.#database[table] ?? []
        return data
    }

    
    insert(table, data){
        if (Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] =  [data]
        }

    this.#persist();

        return data;
    }
    update(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if (rowIndex > -1){
            this.#database[table][rowIndex]= {id, ...data}
            this.#persist()
        }
    }
    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if (rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }


}