import { createConnection } from 'typeorm'
import ExampleEntity from './data/example.entity'
import cors from 'cors'
import express from 'express'
import https from 'https'

const port = 443
const app = express()
app.use(express.json()) // to support JSON-encoded bodies
app.use(cors())
const server = https.createServer(app)

server.listen(port, () => {
	console.log(`listening on port ${port}`)
})

createConnection({
	type: 'sqlite',
	database: 'database.sqlite',
	entities: [ExampleEntity],
	synchronize: true
}).then(connection => {
	app.post('/api/somepath', async (req, res) => {
		res.status(200).send('Success!')
	})

	app.get('/api/someotherpath', async (req, res) => {
		res.send('some response.')
	})
})
