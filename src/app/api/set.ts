import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../prisma/prisma";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return prisma.names.create({
        data: {
            username: req.body.username,
            agreement: req.body.agreement ? 1 : 0,
            id: 1123
        }
    })
}