import express from "express";
import bodyParser from "body-parser";
import { routes } from './routes';
import mongoose from "mongoose";
import cors from 'cors';
import { MongoError } from "mongodb";

const APP = express();
const PORT = process.env.PORT || 4201;

const DB_NAME: string = 'leftovers';
const CLOUD_MONGO_URL: string = `mongodb+srv://haamid:haamid@leftovers-pre0a.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DB_URI: string = CLOUD_MONGO_URL;

mongoose.connect(DB_URI, (err: MongoError) => {
    if (err) {console.log(`Mongoose connect err: ${err.message}`);} 
    else {
        console.log("Succesfully Connected to Database in Server!");
        setupServer();
    }
});

function setupServer() {
    APP.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
        res.header('Access-Control-Max-Ag', '3600');
        res.header('Accept', 'application/json');
        if ('OPTIONS' === req.method) {
            res.sendStatus(200);
        } else {
            console.log(`${req.ip} ${req.method} ${req.url}`);
            next();
        }
    })
    
    APP.use(bodyParser.json());
    APP.use(express.json());
    APP.use('/', routes);
    APP.use(cors());
    
    APP.set("port", PORT);
    
    APP.listen(APP.get("port"), () => {
        console.log(`Backend server listening on ${PORT}`);
    });
}