import prismaClient from "../../prisma";

interface UserProps{
    name: string;
}

class ListUserServiceName{
    async execute({ name }: UserProps){
        const user = await prismaClient.users.findMany({ //Optei em usar o findMany e não o findFirst pois o Many me tras uma flexibilidade de trazer todos os nomes do banco com as letras digitadas, exemplo se no sistema tiver mais do que uma Ana ele tras todas as Anas. Com isso se ele colocar apenas "an" ele vai trazer nomes que contem "an" e se colocar o nome completo e tiver apenas um ele tras apenas ele se não tras todos com o mesmo nome. No caso de usar o First ele tras apenas o primeiro nome que ele encontrar no Banco.
            where: {
                name: {
                    contains: name,
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy:{
                name: "asc",
            },
        });

        if(!user){
            throw new Error('Usuário não encontrado em nossa base de cadastro!')
        }

        return user;
    }
}

export { ListUserServiceName }