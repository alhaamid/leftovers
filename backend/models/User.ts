import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    handle: {
        type: String,
        unique: true,
        index: true,
        required: 'Handle is required'
    },
    password: {
        type: String,
        required: 'Password is required'     
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    claims: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        }],
        default: []
    }
});