import { clientPromise } from "@/util/database";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    let editedBody = {
      date: req.body.date,
      todo: req.body.todo,
      author: req.body.author,
      checked: req.query.status,
    };

    const client = await clientPromise;
    const db = client.db("next-board");
    await db.collection("todo").updateOne(
      { _id: new ObjectId(req.body._id) },
      {
        $set: editedBody,
      }
    );

    res.redirect(302, "/");
  }
}
