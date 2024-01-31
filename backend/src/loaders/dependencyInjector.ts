import { Connection } from 'mongoose'
import { Container } from 'typedi'

export default async ({ database }: { database: Connection }) => {
    try {
        Container.set('Database', database)
        ;(await import('../models')).models.forEach((m) => {
            Container.set(m.name, m.model)
        })

        console.log(`Dependency Injector Loaded`)
    } catch (e) {
        console.log(e.message)
    }
}
