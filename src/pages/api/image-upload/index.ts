import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: `Method ${req.method} is not allowed.` });

  const session = await getSession({ req });
  if (!session || !session.user) {
    return res
      .status(401)
      .json({ error: "You need to be authorized to upload images." });
  }

  return res.status(200).json({ session });
}
