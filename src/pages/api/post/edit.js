import { clientPromise } from "@/util/database";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    let editedBody = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
    };

    const client = await clientPromise;
    const db = client.db("next-board");
    await db.collection("board").updateOne(
      { _id: new ObjectId(req.body._id) },
      {
        $set: editedBody,
      }
    );

    res.redirect(302, "/list");
  }
}
