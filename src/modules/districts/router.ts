import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { DistrictModel } from './schema'

const pathName = 'districts'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await DistrictModel.find({}, null, {
            populate: [
                { path: 'city', model: 'City', select: 'name', options: { strictPopulate: false } },
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
        const match = await DistrictModel.findById(id, null, {
            populate: [
                { path: 'city', model: 'City', options: { strictPopulate: false } },
                { path: 'country', model: 'Country', options: { strictPopulate: false } },
            ],
        })

        if (!match) return res.status(404).json({ error: 'District not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await DistrictModel.create(input)
        return res.status(201).json({ message: 'District created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await DistrictModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'District updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await DistrictModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'District deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const DistrictRouter = router
