import express from 'express';
import { userController } from '../controllers/userControllers';
import { userRepository } from '../repositories/userRepository'
import { userService } from '../services/userServices';


const router = express.Router();
const userRepositoryInstance = new userRepository
const userServiceInstance = new userService(userRepositoryInstance)
const userControllerInstance = new userController(userServiceInstance);

router.get('/', (req, res) => userControllerInstance.getAllUsers(req, res));
router.get('/:id', (req, res) => userControllerInstance.getUserById(req, res));
router.post('/', (req, res) => userControllerInstance.createUser(req, res));
router.put('/:id', (req, res) => userControllerInstance.updateUser(req, res));
router.delete('/:id', (req, res) => userControllerInstance.deleteUser(req, res));

export default router;

