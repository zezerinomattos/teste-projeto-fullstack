import prismaClient from "../../prisma"

class ListUsersServiceAsce{
    async execute(){
        const users = await prismaClient.users.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                created_at: "asc", // Ordenar em ordem crescente Data
            },
        });

        return users;
    }
}

export { ListUsersServiceAsce }
