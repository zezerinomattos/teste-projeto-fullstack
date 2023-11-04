import { Request, Response } from "express"

import { ListUsersServiceAsce } from '../../services/user/ListUsersServiceAsce';

class ListUsersControllerAsce{
    async handle(req: Request, res: Response){

        const listUsersServiceAsce = new ListUsersServiceAsce();

        const users = await listUsersServiceAsce.execute();

        return res.json(users);
    }
}

export { ListUsersControllerAsce }