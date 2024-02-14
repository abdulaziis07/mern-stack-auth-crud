import express from 'express';
import databaseConnection from './config/database.js';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware.js';
import { logger } from './utils/logger.js';

import studentsController from './controllers/students.controller.js';
import usersController from './controllers/users.controller.js';
import authController from './controllers/auth.controller.js';

class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorMiddleware();
        this.initializeDatabaseConnection();
    }

    initializeMiddleware() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan('dev'));
        this.app.use(compression());
    }

    initializeRoutes() {
        this.app.use('/api/students', studentsController);
        this.app.use('/api/users', usersController);
        this.app.use('/auth', authController);
    }

    initializeErrorMiddleware() {
        this.app.use(errorMiddleware);
    }

    async initializeDatabaseConnection() {
        await databaseConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            logger.info(`Express server listening at http://localhost:${this.port}`);
        });
    }
}

export default App;
