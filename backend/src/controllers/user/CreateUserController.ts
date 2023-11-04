import { Request, Response } from "express";

import { CreateUserService } from '../../services/user/CreateUserService';

class CreateUserController{
    async handle(req: Request, res: Response){
        const { name, email, phone } = req.body;

        const createUserService = new CreateUserService();

        //Evitando problemas nas pesquisas e email errado
        const saveName = name.toUpperCase();
        const saveEmail = email.toLowerCase()

        const user = await createUserService.execute({
            name: saveName, 
            email: saveEmail, 
            phone
        });

        return res.json(user);
    }
}

export { CreateUserController }