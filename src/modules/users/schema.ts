import { Schema, model } from 'mongoose'
import { handleOptions } from '@/helpers/schema.helper'

export type TUser = {
    name: string
    document: number
    country: Schema.Types.ObjectId
    city: Schema.Types.ObjectId
    company: Schema.Types.ObjectId
    district: Schema.Types.ObjectId
}

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        document: {
            type: Number,
            required: true,
            unique: true,
            trim: true,
        },
        country: {
            type: Schema.Types.ObjectId,
            ref: 'Country',
            required: true,
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: 'City',
            required: true,
        },
        district: {
            type: Schema.Types.ObjectId,
            ref: 'District',
            required: true,
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },
    },
    handleOptions('users')
)

export const UserModel = model<TUser>('User', UserSchema)
