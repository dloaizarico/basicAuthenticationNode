import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
import userModel from './user.model'
import roleModel from './role.model'

let db: Idb = {
    mongoose: mongoose,
    user: userModel,
    role: roleModel,
    ROLES: ["administrator", "employee", "customer"],
}

export type Idb = {

    mongoose: any,
    user: any,
    role: any,
    ROLES: String[]
}

export default db;