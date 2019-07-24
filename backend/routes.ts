import express from 'express';

export const routes = express.Router();

routes.route('/')
.get((req, res) => {res.send('Backend Server is working');});
