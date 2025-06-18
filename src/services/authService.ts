import bcrypt from 'bcryptjs'
import supabase from '../config/supabase/client.js'
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js'
import { User, Token, JwtPayload } from '../types/user.js'
import { ValidationError } from '../types/errors.js'

class AuthService {
    async register(email: string, password: string) {
        // Проверяем существование email
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            throw new ValidationError('Email already registered', 'email');
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const { data: user, error } = await supabase
            .from('users')
            .insert({ email, password: hashedPassword })
            .select('id, email, created_at')
            .single();

        if (error) {
            throw new ValidationError('Failed to register user', 'database');
        }

        return user;
    }

    async login(email: string, password: string): Promise<Token | undefined>  {
        const { data, error } = await supabase.from('users').select('*').eq('email', email).single()

        if (!data || error) return undefined

        const user = data as User

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return undefined
        }

        const access = generateAccessToken({ id: user.id, email: user.email })
        const refresh = generateRefreshToken({ id: user.id, email: user.email })

        return {
            access,
            refresh
        }
    }

    refreshToken(refreshToken: string): Token | undefined {
        const user = verifyRefreshToken(refreshToken) as JwtPayload
        
        if (user?.id && user?.email) {
            const newAccessToken = generateAccessToken({ id: user.id, email: user.email })
            return { 
                access: newAccessToken,
                refresh: refreshToken
            }
        } else {
            return undefined
        }
    }
}

export default new AuthService()
