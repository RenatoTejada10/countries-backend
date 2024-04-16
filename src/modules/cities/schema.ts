import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TCity = {
    name: string
    country: Schema.Types.ObjectId
    district: Schema.Types.ObjectId
}

const CitySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: 'Country',
            required: true,
        },
    },
    handleOptions('cities')
)

CitySchema.virtual('districts', {
    ref: 'District',
    localField: '_id',
    foreignField: 'city',
})

export const CityModel = model<TCity>('City', CitySchema)
