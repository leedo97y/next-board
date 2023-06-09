import { clientPromise } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    // console.log(req.query.url);
    req.body.imgurl = req.query.url;

    if (session) {
      req.body.author = session.user.name;
    }

    if (req.body.title === "" || req.body.content === "") {
      return res.status(500).json("please fill whole form !");
    }

    try {
      const client = await clientPromise;
      const db = client.db("next-board");
      await db.collection("board").insertOne(req.body);

      return res.redirect(302, "/list");
    } catch (err) {
      console.error(err);
    }
  }
}
