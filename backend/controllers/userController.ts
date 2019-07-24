import mongoose from "mongoose";
import { UserSchema } from "../models/User";
import promise from "promise";

export class UserController {
    User: mongoose.Model<mongoose.Document> = mongoose.model('User', UserSchema);

    constructor() {}

    public getAUser(handle: string) {
        return new promise<Result>((resolve, reject) => {
            let condition = { handle: { $eq: handle } };
            this.User.findOne(condition, (err, user) => {
                if (err) {
                    console.log(err);
                    reject({code: 500, result: err});
                } else {
                    if (user) {
                        resolve({code: 200, result: user});
                        // user.populate('listings', (err, populatedUser: mongoose.Document) => {
                        //     if (populatedUser) {
                        //         resolve({code: 200, result: populatedUser});
                        //     } else {
                        //         console.log("Error while populating user");
                        //         reject({code: 500, result: err});
                        //     }
                        // })
                    } else {
                        console.log(`${handle} not found`);
                        reject({code: 404, result: `${handle} not found`});
                    }
                }
            });
        });
    }

    public addNewUser(userJSON) {
        let newUser = new this.User(userJSON);
        return new promise <Result>((resolve, reject) => {
            newUser.save((err, user) => {
                if (err) {
                    console.log("Error while creating a new user", err);
                    reject({code: 500, result: err});
                } else {
                    resolve({code: 201, result: user});
                }
            });
        });
    }

    public getAllUsers() {
        return new promise <Result> ((resolve, reject) => {
            this.User.find((err: any, users: any) => {
                if (err) {
                    console.log(err);
                    reject({code: 404, result: err})
                } else {
                    resolve({code: 200, result: users});
                }
            }, (err) => {
                console.log(err);
            });
        });
    }
}

export interface Result {
    code: number;
    result: any;
}
