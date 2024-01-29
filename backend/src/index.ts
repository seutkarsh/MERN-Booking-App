import express from 'express'
import 'reflect-metadata'
import Loader from './loaders/index'
import config from './config'
import path from 'path'

const startServer = async () => {
    const app = express()

    await Loader({ expressApp: app })
    app.use(express.static(path.join(__dirname, '../../frontend/build')))

    return app.listen(config.port, () => {
        console.log(`Server Listening on port: ${config.port}`)
    })
}

startServer()
    .then(() => {
        console.log(`Server Start Complete`)
    })
    .catch((e) => {
        console.log(`Server Start Failed becasuse of Error: ${e.message}`)
    })
