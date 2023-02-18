import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if (method === 'GET' && url === '/tasks') {
        
        const tasks = database.select("tasks")
        
        return res.end(JSON.stringify(tasks))
    }

    if (method === 'POST' && url === '/tasks') {
        
        const { title, description } = req.body

        const task = {
            id: randomUUID(),
            title,
            description,
            completedAt: null,
            createdAt: new Date(),
            updatedAt: null
        }

        database.insert("tasks", task)

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333, () => {
    console.log('Server running on port 3333')
})