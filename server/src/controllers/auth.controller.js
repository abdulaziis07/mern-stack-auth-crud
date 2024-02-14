import { Router } from 'express';
import { AuthService } from '../services/auth.service.js';
import {
  registerValidation,
  loginValidation
} from '../validations/auth.validation.js';

class AuthController {
  constructor() {
    this.router = Router();
    this.authService = new AuthService();
    this.routes();
  }

  routes() {
    this.router.post('/register', async (req, res, next) => {
      const { body: userData } = req;
      const { error, value } = registerValidation(userData);
      if (error)
        return res.status(400).json({
          error: {
            message: error.details[0].message
          }
        });
      try {
        const registerUser = await this.authService.register(value);
        res.status(201).json({
          status: 'ok',
          message: 'success to register user',
          data: registerUser
        });
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/login', async (req, res, next) => {
      const { body: userData } = req;
      const { error, value } = loginValidation(userData);
      if (error)
        return res.status(400).json({
          error: {
            message: error.details[0].message
          }
        });
      try {
        const loginUser = await this.authService.login(
          userData.password,
          value.email
        );
        if (this.authService.authHeader !== null)
          return res
            .header('auth-token', this.authService.authToken)
            .send({ accessToken: this.authService.authToken, user: loginUser });
      } catch (error) {
        next(error);
      }
    });
  }
}

export default new AuthController().router;
