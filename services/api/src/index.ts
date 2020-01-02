import 'reflect-metadata';

import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { createConnection } from 'typeorm';

import router from './controllers/router';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const initDB = async () => {
    try {
        const conn = await createConnection();
    } catch (err) {
        // tslint:disable-next-line: no-console
        console.error(err);
    }
};

const startServer = async () => {
    return new Promise((resolve, reject) => {
        app.listen(process.env.SERVER_PORT, () => {
            // tslint:disable-next-line: no-console
            console.log(`server started at http://localhost: ${process.env.SERVER_PORT}`);
            resolve(true);
        // tslint:disable-next-line: no-console
        }).on('error', console.error);
    });
};

async function start() {
    await initDB();
    await startServer();
}

start();
