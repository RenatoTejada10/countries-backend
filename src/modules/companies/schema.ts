import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TCompany = {
    name: string
    price: number
    country: Schema.Types.ObjectId
}

const CompanySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: 'Country',
            required: true,
        },
    },
    handleOptions('companies')
)

export const CompanyModel = model<TCompany>('Company', CompanySchema)
