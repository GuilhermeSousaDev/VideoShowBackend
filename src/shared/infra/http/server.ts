import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import '../typeorm';
import '../../container';

import router from './routes/index.routes';
import AppError from '../../errors/AppError';
import { errors } from 'celebrate';

class App {
    app: express.Application;
    port = 8081 || process.env.PORT;

    constructor () {
        this.app = express();
        this.middlewares();
        this.routes();
        this.listen();
    }

    private middlewares () {
        this.app.use(cors());
    }

    private routes () {
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(router);
        this.app.use(errors());
        this.app.use('/videos', express.static('uploads/'));
        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    status: 'error',
                    message: error.message,
                });
            }

            return res.status(500).json({
                status: 'error',
                message: 'internal server error',
                error: error.message,
            });
        });
    }

    private listen () {
        this.app.listen(this.port, () => console.log("Iniciado"));
    }
}

new App();