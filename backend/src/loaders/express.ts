import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import routes from '../api/index'
import config from '../config'
import cookieParser from 'cookie-parser'
import path from 'path'

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
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(
        cors({
            origin: config.frontend.url,
            credentials: true,
        })
    )
    /*
    Load Frontend as Static Pages
    */
    app.use(express.static(path.join(__dirname, '../../../frontend/build')))
    /*
    API Routes
    */
    app.use('/api', routes())
    /*
    Load Pages with Conditional Rendering
    */
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '../../../frontend/build/index.html'))
    })
}
