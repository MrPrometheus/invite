import {NextResponse} from "next/server"
import prisma from "../../../../prisma/prisma";

export async function POST(req: Request) {
    const data = await req.json()
    await prisma.names.create({
        data: {
            username: data.username,
            agreement: data.agreement ? 1 : 0
        }
    })
    return NextResponse.json({})
}