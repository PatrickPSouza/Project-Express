import db from '../database';
import { user } from '../models/userModels';
import { userRepository } from '../repositories/userRepository';


export class userService {

    private userRepository: userRepository;

    constructor(userRepository: userRepository) {
        this.userRepository = userRepository;
    }

    public async getAllUsers(): Promise<any>{
        const users = await this.userRepository.getAllUsers();
        return users;
    }



    public async getUserById(id: number): Promise<any> {
            const user  = await this.userRepository.getUserById(id);
            return user;
    }

    public async createUser(name: string, age: number, email: string): Promise<user>{
        const user = await this.userRepository.CreateUser(name, age, email);
        return user;
    }

    public async updateUser(id: number, newData: Partial<user>): Promise<any> {
       const user = await this.userRepository.updateUser(id, newData);
       return user;
    }

    public async deleteUser(id: number): Promise<any>{
        const user = await this.userRepository.deleteUser(id);
        return user;
    }

}