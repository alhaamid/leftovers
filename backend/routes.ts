import express from 'express';
import { UserController } from './controllers/userController';

export const routes = express.Router();

let userController = new UserController();

routes.route('/')
.get((req, res) => {
    // res.send('Backend Server is working');
    userController.getAllUsers()
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);})
});

routes.route('/user/:handle')
.get((req, res) => {
    const handle = req.params["handle"];
    userController.getAUser(handle)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);})
})

.post((req, res) => {
    userController.addNewUser(req.body)
    .then(obj => {res.status(obj["code"]).send(obj["result"]);})
    .catch(obj => {res.status(obj["code"]).send(obj["result"]);});
});