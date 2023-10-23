import prisma from './prisma'

async function main() {
    const response = await Promise.all([
        await prisma.names.upsert({
            where: { username: "1", agreement: 1, id: 1 },
            update: {},
            create: {
                username: '1',
                agreement: 1,
            },
        }),
    ])
    console.log(response)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })