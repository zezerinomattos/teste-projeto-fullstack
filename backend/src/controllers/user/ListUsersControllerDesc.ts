import { Request, Response } from "express"

import { ListUsersServiceDesc} from '../../services/user/ListUsersServiceDesc';

class ListUsersControllerDesc{
    async handle(req: Request, res: Response){

        const listUsersServiceDesc = new ListUsersServiceDesc();

        const users = await listUsersServiceDesc.execute();

        return res.json(users);
    }
}

export { ListUsersControllerDesc }