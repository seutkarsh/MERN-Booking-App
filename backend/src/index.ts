import express from 'express'
import 'reflect-metadata'
import Loader from './loaders/index'
import config from './config'

const startServer = async () => {
    const app = express()

    await Loader({ expressApp: app })

    return app.listen(config.port, () => {
        console.log(`Server Listening on port: ${config.port}`)
    })
}

startServer()
    .then(() => {
        console.log(`Server Start Complete`)
    })
    .catch((e) => {
        console.log(`Server Start Failed because of Error: ${e.message}`)
    })
