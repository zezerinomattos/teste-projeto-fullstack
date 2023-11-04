import { Request, Response } from "express";

import { EditUserService } from '../../services/user/EditUserService'

class EditUserController{
    async handle(req: Request, res: Response){
        const { user_id, name, email, phone } = req.body;

        const editUserService = new EditUserService();

        //Evitando problemas nas pesquisas e email errado
        const saveName = name.toUpperCase();
        const saveEmail = email.toLowerCase()

        const user = await editUserService.execute({
            user_id, 
            name: saveName, 
            email: saveEmail, 
            phone
        });

        return res.json(user);
    }
}

export { EditUserController }