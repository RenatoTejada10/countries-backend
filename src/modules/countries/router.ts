import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { CountryModel } from './schema'

const pathName = 'countries'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await CountryModel.find({}, null, {
            populate: [
                { path: 'city', model: 'City', options: { strictPopulate: false } },
                { path: 'district', model: 'District', options: { strictPopulate: false } },
                { path: 'company', model: 'Company', options: { strictPopulate: false } },
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
        const match = await CountryModel.findById(id, null, {
            populate: [
                { path: 'city', model: 'City', options: { strictPopulate: false } },
                { path: 'district', model: 'District', options: { strictPopulate: false } },
                { path: 'company', model: 'Company', options: { strictPopulate: false } },
            ],
        })
        if (!match) return res.status(404).json({ error: 'Country not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await CountryModel.create(input)
        return res.status(201).json({ message: 'Country created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await CountryModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'Country updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await CountryModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Country deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const CountryRouter = router
