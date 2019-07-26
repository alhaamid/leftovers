import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
        type: String,
        required: 'Listing title is required',
        index: true,
    },
    description: {
        type: String,
        required: 'Description is required',
        index: true,
    },
    location: {
        type: String,
        default: 'Yelp',
    },
    imageUrl: {
        type: String,
        default: 'https://greatinspector.com/wp-content/uploads/2016/12/yelp-burst-logo.png',
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: 'Listing date and time required.'
    },
    isClaimed: {
        type: Boolean,
        default: false,
    },
    claimedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: {
        type: [{type: String}],
        default: []
    },
});

ListingSchema.index({
    title: 'text',
    description: 'text',
});

export {ListingSchema};