import express from 'express'
import { CountryRouter } from './modules/countries/router'
import { connectToDatabase } from './settings/database.setting'
import { CityRouter } from './modules/cities/router'
import { DistrictRouter } from './modules/districts/router'
import { UserRouter } from './modules/users/router'
import cors from 'cors'
import { CompanyRouter } from './modules/companies/router'

const app = express()

const initServer = async () => {
    await connectToDatabase()

    app.use(cors({ origin: ['http://localhost:3000'] }))
    app.use(express.json())

    app.use(CityRouter)
    app.use(CompanyRouter)
    app.use(CountryRouter)
    app.use(DistrictRouter)
    app.use(UserRouter)

    app.listen(4000, () => {
        console.log('Server is running on port http://localhost:4000')
    })
}

initServer()
