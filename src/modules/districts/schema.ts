import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TDistrict = {
    name: string
    city: Schema.Types.ObjectId
    country: Schema.Types.ObjectId
}

const DistrictSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: 'City',
            required: true,
        },
    },
    handleOptions('districts')
)

export const DistrictModel = model<TDistrict>('District', DistrictSchema)
