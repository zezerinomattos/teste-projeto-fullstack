import { Request, Response } from "express"

import { ListUserServiceName } from '../../services/user/ListUserServiceName';

class ListUsersControllerName{
    async handle(req: Request, res: Response){
        const name = req.query.name as string;

        const listUserServiceName = new ListUserServiceName();

        const saveName = name.toUpperCase();

        const user = await listUserServiceName.execute({
            name: saveName,
        });

        return res.json(user);
    }
}

export { ListUsersControllerName }