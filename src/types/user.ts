export interface User {
    id: number
    email: string
    password: string
    created_at: string
}

export interface Token {
    access: string
    refresh: string
}

export interface JwtPayload {
    id: number
    email: string
}
