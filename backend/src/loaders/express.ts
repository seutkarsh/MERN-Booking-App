import express, { Application, Request, Response } from 'express'
import cors from 'cors'

export default ({ app }: { app: Application }): void => {
    /*
    Health Check Endpoint
    */

    app.get('/health', (req: Request, res: Response) => {
        res.status(200).end()
    })

    app.head('/health', (req: Request, res: Response) => {
        res.status(200).end()
    })
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())

    app.get('/', (req: Request, res: Response) => {
        res.send('Response from server')
    })
}
