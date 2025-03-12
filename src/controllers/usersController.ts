import { Request, Response } from 'express'
import usersService from '../services/usersService'

class UsersController {
    async getUserList(req: Request, res: Response): Promise<any> {
        const users = await usersService.getUserList()

        if (users) {
            return res.status(200).json(users)
        }

        return res.status(500).json({ message: 'Error getting users' })
    }
    
    async getUserById(req: Request, res: Response): Promise<any> {
        const id = Number(req.params.id)
        const { user } = req.body
        
        if (id !== user.id) {
            return res.status(403).json({ message: 'Invalid credentials' })
        }

        const data = await usersService.getUserById(id)

        if (data) {
            return res.status(200).json(data)
        }

        return res.status(500).json({ message: 'Error getting user data' })
    }
}

export default new UsersController()
