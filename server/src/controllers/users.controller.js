import { Router } from 'express';
import { UsersService } from '../services/users.service.js';
import { usersValidation } from '../validations/users.validation.js';
import authMiddleware from '../middleware/auth.middleware.js';

class UsersController {
    constructor() {
        this.router = Router();
        this.usersService = new UsersService();
        this.routes();
    }

    routes() {
        this.router.get('/', authMiddleware, async (req, res, next) => {
            try {
                const users = await this.usersService.findAllUser();
                res.status(200).json({
                    status: 'ok',
                    message: 'success to get all users',
                    data: users
                });
            } catch (error) {
                next(error);
            }
        });

        this.router.get('/:id', authMiddleware, async (req, res, next) => {
            const { id: userId } = req.params;
            try {
                const user = await this.usersService.findUserById(userId);
                res.status(200).json({
                    status: 'ok',
                    message: 'success to get user by id',
                    data: user
                });
            } catch (error) {
                next(error);
            }
        });

        this.router.post('/', authMiddleware, async (req, res, next) => {
            const { body: userData } = req;
            const { error, value } = usersValidation(userData);
            if (error)
                return res.status(400).json({
                    error: {
                        message: error.details[0].message
                    }
                });
            try {
                const user = await this.usersService.createUser(value);
                res.status(201).json({
                    status: 'ok',
                    message: 'success to create new user',
                    data: user
                });
            } catch (error) {
                next(error);
            }
        });

        this.router.patch('/:id', authMiddleware, async (req, res, next) => {
            const { id: userId } = req.params;
            const { body: userData } = req;
            const { error, value } = usersValidation(userData);
            if (error)
                return res.status(400).json({
                    error: {
                        message: error.details[0].message
                    }
                });
            try {
                const user = await this.usersService.updateUser(userId, value);
                res.status(200).json({
                    status: 'ok',
                    message: 'success to update user',
                    data: user
                });
            } catch (error) {
                next(error);
            }
        });

        this.router.delete('/:id', authMiddleware, async (req, res, next) => {
            const { id: userId } = req.params;
            try {
                const user = await this.usersService.deleteUser(userId);
                res.status(200).json({
                    status: 'ok',
                    message: 'success to delete user',
                    data: user
                });
            } catch (error) {
                next(error);
            }
        });
    }
}

export default new UsersController().router;
