import prismaClient from "../../prisma"

class ListUsersService{
    async execute(){
        const users = await prismaClient.users.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                name: "asc", // Ordenar em ordem crescente pelo nome
            },
        });

        return users;
    }
}

export { ListUsersService }