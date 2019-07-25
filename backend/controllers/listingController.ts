import mongoose from "mongoose";
import { ListingSchema } from "../models/Listing";
import promise from "promise";

export class ListingController {
    Listing: mongoose.Model<mongoose.Document> = mongoose.model('Listing', ListingSchema);

    constructor() {}

    public createNewListing(listingJSON) {
        let newListing = new this.Listing(listingJSON);
        return new promise <Result>((resolve, reject) => {
            newListing.save((err, listing) => {
                if (err) {
                    console.log("Error while creating a new listing", err);
                    reject({code: 500, result: err});
                } else {
                    resolve({code: 200, result: listing});
                }
            });
        });
    }

    public getAListing(id: string) {
        return new promise<Result>((resolve, reject) => {
            let condition = {_id: { $eq: id} };
            this.Listing.findOne(condition, (err, listing) => {
                if (err) {
                    console.log('Error while retrieving a listing', err)
                    reject({code: 500, result: err});
                } else {
                    if (listing) {
                        resolve({code: 200, result: listing})
                    } else {
                        console.log(`${id} not found`);
                        reject({code: 404, results: `${id} not found`});
                    }
                }
            });
        });
    }

    public getAllListings() {
        return new promise<Result>((resolve, reject) => {
            let condition = {isClaimed: {$eq: false}};
            // resolve({code:500, result: 1})
            this.Listing.find(condition, (err, listings) => {
                if (err) {
                    console.log('Error while retrieiving the listings', err)
                    reject({code: 500, result: err});
                } else {
                    if (listings) {
                        resolve({code: 200, result: listings});
                    } else {
                        console.log('Could not retrieve all the listings');
                        reject({code: 404, results: []});
                    }
                }
            });
        });
    }

    public deleteAListing(id: string) {
        return new promise<Result>((resolve, reject) => {
            let condiiton = {_id: {$eq: id}};
            this.Listing.deleteOne(condiiton, (err) => {
                if (err) {
                    console.log('Could not delete the listing');
                    reject({code: 500, result: err});
                } else {
                    resolve({code: 200, result:[]});
                }
            });
        });
    }

    public searchListings(searchQuery: string) {
        return new promise<Result>((resolve, reject) => {
            console.log(`searchQuery = ${searchQuery}`)

            this.Listing.find({$text: {$search: searchQuery}})
            .exec((err, docs) => {
                if (err) {
                    console.log('Error while search', err)
                    reject({code: 500, result: err});
                } else {
                    console.log('Following documents matches search:')
                    console.log(docs)
                    resolve({code: 200, result:docs});
                }
            });
        });
    }

}

export interface Result {
    code: number,
    result: any
}