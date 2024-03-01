import {Request, Response} from 'express';
import { userService } from '../services/userServices';
export class userController {

    private userService: userService;

    constructor (userService: userService) {
        this.userService = userService;
    }

    public async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
        res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: 'erro interno de servidor'})
        }
    }




    public async getUserById(req: Request, res: Response): Promise<void> {
        const userID = Number(req.params.id);
        try {
            const user = await this.userService.getUserById(userID);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'user not found'});
            }

         
        } catch (error){
            console.error(error);
            res.status(500).json({ error: 'internal server error'});

        }    

    }

    public async createUser(req: Request, res: Response): Promise<void> {
        const {name, age, email} = req.body;
        try {
            const newUser = await this.userService.createUser(name, age, email)
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error'})
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const userId = Number(req.params.id);
        const {name, age, email} = req.body;
        try {
            const existingUser = await this.userService.getUserById(userId);
            if (!existingUser) {
                res.status(404).json({ error: 'user not found'});
            } else {

            const updateUser = await this.userService.updateUser(userId, {name, age, email});
            res.status(200).json({ message: 'usuario atualizado com sucesso'})
            res.json(updateUser);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error'});
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = Number(req.params.id);
        try {
            
            await this.userService.deleteUser(userId);
            res.json({ message: 'usuario deletado com sucesso'})
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'internal server error'})
        }

    }






}