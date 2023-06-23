import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const records = await prisma.record.findMany();
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the records." });
    } finally {
        await prisma.$disconnect();
    }
}
