import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
        type: String,
        required: 'Listing title is required'
    },
    description: {
        type: String,
    },
    condition: {
        type: String,
        required: 'Condition is required.'
    },
    images: {
        type: [String]
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: 'Listing date and time required.'
    },
    isClaimed: {
        type: Boolean,
        required: 'Claimed status required.'
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

ListingSchema.index({
    title: 'text',
    description: 'text'
});

export {ListingSchema};