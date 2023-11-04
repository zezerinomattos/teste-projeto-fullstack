import prismaClient from "../../prisma";

export interface UserRequest{
    user_id: string;
}

class DeleteUserService{
    async execute({ user_id }: UserRequest){
        //VERIFICANDO SE ID EXISTE
        const userAlreadyExists = await prismaClient.users.findFirst({
            where:{
               id: user_id,
            },
        });

        if(!userAlreadyExists){
            throw new Error('Dados Invalidos, ID inexistente!');
        }

        const user = await prismaClient.users.delete({
            where: {
                id: user_id,
            }
        });

        return user;
    }
}

export { DeleteUserService }