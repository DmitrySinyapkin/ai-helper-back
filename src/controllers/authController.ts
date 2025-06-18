import { Request, Response } from 'express'
import authService from "../services/authService.js"
import { asyncHandler } from '../utils/errorHandler.js'
import { ValidationError } from '../types/errors.js'

class AuthController {
    register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body

        if (!email || !password) {
            throw new ValidationError('Email and password are required');
        }

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError('Invalid email format', 'email');
        }

        // Валидация пароля
        if (password.length < 6) {
            throw new ValidationError('Password must be at least 6 characters long', 'password');
        }

        const user = await authService.register(email, password);
        res.status(201).json(user);
    });

    login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body

        if (!email || !password) {
            throw new ValidationError('Email and password are required');
        }

        const token = await authService.login(email, password)

        if (!token) {
            throw new ValidationError('Invalid credentials');
        }

        res.json(token);
    });

    refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { refresh } = req.body

        if (!refresh) {
            throw new ValidationError('No refresh token provided');
        }

        const token = authService.refreshToken(refresh)

        if (!token) {
            throw new ValidationError('Invalid refresh token');
        }

        res.json(token);
    });
}

export default new AuthController()
