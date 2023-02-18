import http from 'node:http'
import { Database } from './database.js'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    console.log(route)

    if (route) {
        const routeParams = req.url.match(route.path)
        
        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extraQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333, () => {
    console.log('Server running on port 3333')
})