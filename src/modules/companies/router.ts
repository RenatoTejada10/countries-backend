import { handleError } from '@/helpers/router.helper'
import { Router } from 'express'
import { CompanyModel } from './schema'

const pathName = 'companies'

const router = Router()

router.get(`/${pathName}`, async (req, res) => {
    try {
        const matches = await CompanyModel.find()
            .populate({
                model: 'Country',
                options: { strictPopulate: false },
                path: 'country',
            })
            .exec()
        return res.status(200).json(matches)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.get(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        const match = await CompanyModel.findById(id)
            .populate({
                path: 'country',
                model: 'Country',
                options: { strictPopulate: false },
            })
            .exec()
        if (!match) return res.status(404).json({ error: 'Company not found' })
        return res.status(200).json(match)
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.post(`/${pathName}`, async (req, res) => {
    const input = req.body

    try {
        await CompanyModel.create(input)
        return res.status(201).json({ message: 'Company created' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.put(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id
    const input = req.body

    try {
        await CompanyModel.findByIdAndUpdate(id, input)
        return res.status(200).json({ message: 'Company updated' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

router.delete(`/${pathName}/:id`, async (req, res) => {
    const id = req.params.id

    try {
        await CompanyModel.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Company deleted' })
    } catch (error) {
        return handleError(error, res, pathName)
    }
})

export const CompanyRouter = router
