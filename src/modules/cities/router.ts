import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { CityModel } from './schema'

const pathName = 'cities'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await CityModel.find({}, null, {
            populate: [
                { path: 'districts', model: 'District', options: { strictPopulate: false } },
                { path: 'country', model: 'Country', options: { strictPopulate: false } },
            ],
        })
        return res.status(200).json(matches)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.get(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const match = await CityModel.findById(id, null, {
            populate: [
                { path: 'districts', model: 'District', options: { strictPopulate: false } },
                { path: 'country', model: 'Country', options: { strictPopulate: false } },
            ],
        })

        if (!match) return res.status(404).json({ error: 'City not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await CityModel.create(input)
        return res.status(201).json({ message: 'City created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await CityModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'City updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await CityModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'City deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const CityRouter = router
