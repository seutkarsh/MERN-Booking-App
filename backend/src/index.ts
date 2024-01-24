import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_CONNECTION_URI as string)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Response from server')
})

app.listen(5000, () => {
    console.log(`Server Listening on port 5000`)
})
