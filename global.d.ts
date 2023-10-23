import {PrismaClient} from "@prisma/client";

declare global {
    var prisma: PrismaClient;
}

declare module globalThis {
    var prisma: PrismaClient;
}