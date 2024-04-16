import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TCountry = {
    name: string
    code: string
    numberCode: number
}

const CountrySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },
        numberCode: {
            type: Number,
            required: true,
        },
    },
    handleOptions('countries')
)

export const CountryModel = model<TCountry>('Country', CountrySchema)
