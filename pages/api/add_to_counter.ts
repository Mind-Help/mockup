import type { NextApiResponse, NextApiRequest } from "next";

import client from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db_res = await client.counter.create({ data: {} });

  if (db_res) return res.status(201).json({ data: db_res });
  return res.status(500).json({ message: "Internal Server Error" });
};
