import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import routes from '../api/index'

export default ({ app }: { app: Application }): void => {
    /*
    Health Check Endpoint
    */
    app.get('/api/health', (req: Request, res: Response) => {
        res.status(200).end()
    })

    app.head('/api/health', (req: Request, res: Response) => {
        res.status(200).end()
    })
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    app.use('/api', routes())
}
