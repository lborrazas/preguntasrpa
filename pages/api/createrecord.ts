import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === "POST") {
        const { name, points } = req.body;

        try {
            const record = await prisma.record.create({
                data: {
                    name: req.body.name,
                    points: req.body.points
                },
            });

            res.status(201).json(record);
        } catch (error) {
            res.status(500).json({ error: "An error occurred while creating the record." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }

    await prisma.$disconnect();
}
