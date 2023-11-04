import prismaClient from "../../prisma"

class ListUsersServiceDesc{
    async execute(){
        const users = await prismaClient.users.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                created_at: "desc", // Ordenar em ordem decrescente Data
            },
        });

        return users;
    }
}

export { ListUsersServiceDesc }
