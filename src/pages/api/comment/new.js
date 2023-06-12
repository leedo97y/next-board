import { clientPromise } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    console.log(req.body);

    let saveComment = {
      content: req.body.comment,
      parentId: new ObjectId(req.body._id),
      author: session ? session.user.name : "guest",
    };

    if (req.body.comment === "") {
      return res.status(500).json("please fill whole form !");
    }

    try {
      const client = await clientPromise;
      const db = client.db("next-board");
      await db.collection("comment").insertOne(saveComment);

      return res.redirect(302, `/detail/${req.body._id}`);
    } catch (err) {
      console.error(err);
    }
  }
}
