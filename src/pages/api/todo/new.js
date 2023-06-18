import { clientPromise } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (session) {
      req.body.author = session.user.name;
    }

    if (req.body.todo === "") {
      return res.status(500).json("please fill whole form !");
    }

    try {
      const client = await clientPromise;
      const db = client.db("next-board");
      await db.collection("todo").insertOne(req.body);

      return res.redirect(302, "/");
    } catch (err) {
      console.error(err);
    }
  }
}
