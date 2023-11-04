import prismaClient from "../../prisma"

interface UserRequest{
    initialDate: Date;
    finalDate: Date;
}

class ListPeriodTimeService{
    async execute({ initialDate, finalDate }: UserRequest){
        
        const users = await prismaClient.users.findMany({
            where: {
                created_at:{
                    gte: initialDate,
                    lte: finalDate,
                },
            },
            select:{
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                created_at: 'desc',
            },
        });

        return users;
    }
}

export { ListPeriodTimeService }