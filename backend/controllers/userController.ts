import mongoose from "mongoose";
import { UserSchema } from "../models/User";
import promise from "promise";

export class UserController {
    User: mongoose.Model<mongoose.Document> = mongoose.model('User', UserSchema);
    userKeysToHide: string[] = ['password'];

    constructor() {}

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

    public checkCredentials(credentials) {
        const handle = credentials.handle;
        const password = credentials.password;
        return new promise<Result> ((resolve, reject) => {
            this.getAUser(handle, false)
            .then(obj => {
                const user = obj["result"];
                if (user["password"]==password) {
                    const veiledUser = this.removeSomeKeys(user, this.userKeysToHide);
                    resolve({code: 200, result: veiledUser});
                } else {
                    resolve({code: 404, result: "Credentials are incorrect"});
                }
            })
            .catch(obj => obj);
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

    public getAUser(handle: string, veil: boolean) {
        return new promise<Result>((resolve, reject) => {
            console.log(`handle = ${handle} `);
            let condition = { handle: { $eq: handle } };
            this.User.findOne(condition, (err, user) => {
                if (err) {
                    console.log(err);
                    reject({code: 500, result: err});
                } else {
                    if (user) {
                        let result = undefined;
                        if (veil) {
                            result = this.removeSomeKeys(user, this.userKeysToHide);
                        } else {
                            result = user;
                        }
                        resolve({code: 200, result: result});
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

    private removeSomeKeys(userSchemaJSON, keepWhichKeys: string[]) {
        let newObj = JSON.parse(JSON.stringify(userSchemaJSON));
        let allKeys = Object.keys(newObj);
        allKeys.forEach((key) => {
            if (keepWhichKeys.indexOf(key) != -1) {
                delete newObj[key];
            }
        });
        return newObj;
    }
}

export interface Result {
    code: number;
    result: any;
}
