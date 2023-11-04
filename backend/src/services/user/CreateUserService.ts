import prismaClient from "../../prisma";

export interface UserRequest{
    name: string;
    email: string; 
    phone: string;
}

class CreateUserService{
    async execute({ name, email, phone }: UserRequest){

        if(!name || !email || !phone){
            throw new Error('Dados Invalidos, Informe os dados obrigatórios');
        }
        
        //VERIFICANDO EMAIL DUPLOS
        const userAlreadyExists = await prismaClient.users.findFirst({
            where:{
                email: email,
            },
        });

        if(userAlreadyExists){
            throw new Error('Dados Invalidos, Esse EMAIL já está cadastrado!');
        }

        const user = await prismaClient.users.create({
            data:{
                name,
                email,
                phone
            },
        });

        return user
    }
}

export { CreateUserService }