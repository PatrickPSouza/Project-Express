import express from "express";
import userRoutes from './routes/userRoutes';
import { userController } from "./controllers/userControllers";
import { userService } from "./services/userServices";
import { userRepository } from "./repositories/userRepository";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

const userRep = new userRepository();
const userServ = new userService(userRep);
const userControl = new userController(userServ);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
    userControl.getAllUsers(req, res)
})


app.use('/users', userRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app;