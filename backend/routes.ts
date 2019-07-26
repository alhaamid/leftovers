import express from 'express';
import { UserController } from './controllers/userController';
import { ListingController } from './controllers/listingController';

export const routes = express.Router();

let userController = new UserController();
let listingController = new ListingController();

routes.route('/')
.get((req, res) => {
    res.send('Backend Server is working');
});

routes.route('/login')
.put((req, res) => {
    userController.checkCredentials(req.body)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);})
})

routes.route('/user')
.post((req, res) => {
    userController.addNewUser(req.body)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);});
});

routes.route('/user/:handle')
.get((req, res) => {
    const handle = req.params["handle"];
    userController.getAUser(handle, true)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);})
});


routes.route('/listing')
.post((req, res) => {
    listingController.createNewListing(req.body)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);})
});

routes.route('/listing/search/')
.get((req, res) => {
    const searchQuery = req.query["q"];
    listingController.searchListings(searchQuery)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);})
});

routes.route('/listing/:id')
.put((req, res) => {
    const id = req.params["id"];
    console.log(id)
    console.log('put request. body = ' + JSON.stringify(req.body))
    console.log(req.body["isClaimed"])
    listingController.updateAListing(id, req.body)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);})
});

routes.route('/listing/:id')
.get((req, res) => {
    const id = req.params["id"]
    listingController.getAListing(id)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);});
});

routes.route('/listing/:id')
.delete((req, res) => {
    const id = req.params["id"];
    listingController.deleteAListing(id)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);})
});

routes.route('/listing')
.get((req, res) => {
    listingController.getAllListings()
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);});
});