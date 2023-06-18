import { clientPromise } from "@/util/database";
const ObjectId = require("mongodb").ObjectId;
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await clientPromise;
    const db = client.db("next-board");

    let session = await getServerSession(req, res, authOptions);

    let data = await db
      .collection("todo")
      .findOne({ _id: new ObjectId(req.body) });

    if (data.author === session.user.name) {
      await db.collection("todo").deleteOne({ _id: new ObjectId(req.body) });
      res.status(200).json("success !");
    } else {
      res.status(500).json("user error : can't delete this content !");
    }
  }
}
