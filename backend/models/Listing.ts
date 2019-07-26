import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
        type: String,
        required: 'Listing title is required'
    },
    description: {
        type: String,
        default: 'description',
    },
    location: {
        type: String,
        default: 'Yelp',
    },
    imageUrl: {
        type: String,
        default: 'https://images-na.ssl-images-amazon.com/images/I/51z376z5iBL._SL1200_.jpg',
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
        default: ['What a comment', 'Yo yo yo yo', 'What a comment', 'Yo yo yo yo', 'What a comment', 'Yo yo yo yo', 'What a comment', 'Yo yo yo yo']
    },
});

ListingSchema.index({
    title: 'text',
    description: 'text',
    location: 'text',
});

export {ListingSchema};