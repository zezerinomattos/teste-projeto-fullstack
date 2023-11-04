import prismaClient from "../../prisma"

export interface UserRequest{
    user_id: string;
    name?: string;
    email?: string; 
    phone?: string;
}

class EditUserService{
    async execute({ user_id, name, email, phone }: UserRequest){ //Teoricamente nao deixaria editar email, mas por ser um teste vou permetir. O email e nosso ponto de verificacao para duplicidade de usuario na rota de criacao de novo user.
        if(!user_id){
            throw new Error('Dados Invalidos, Informe os dados obrigatórios');
        }

        //VERIFICANDO SE ID EXISTE
        const userAlreadyExists = await prismaClient.users.findFirst({
            where:{
               id: user_id,
            },
        });

        if(!userAlreadyExists){
            throw new Error('Dados Invalidos, ID inexistente!');
        }

        const user = await prismaClient.users.update({
            where: {
                id: user_id,
            },
            data:{
                name,
                email,
                phone,
                updated_at: new Date,
            },
        });
        
        return user;
    }
}

export { EditUserService }