import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";

const client = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db_res = await client.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    if (db_res) {
      return res.status(201).json({ data: db_res });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  } catch (e: any) {
    if ((e.message as string).indexOf("Unique constraint")) {
      return res.status(400).json({ message: "email em uso" });
    }
  }
};
