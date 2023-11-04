import prismaClient from "../../prisma";

import { UserRequest } from './DeleteUserService';

class DetailUserService{
    async execute({ user_id }: UserRequest){

        const user = await prismaClient.users.findUnique({
            where: {
                id: user_id
            }
        });

        if(!user){
            throw new Error('Dados Invalidos, ID inexistente!');
        }

        return user
    }
}

export { DetailUserService }