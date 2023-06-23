import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === "DELETE") {
        try {
            await prisma.record.deleteMany();

            res.status(200).json({ message: "All records deleted successfully." });
        } catch (error) {
            res.status(500).json({ error: "An error occurred while deleting the records." });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }

    await prisma.$disconnect();
}
