import { clientPromise } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      let client = await clientPromise;
      let db = client.db("next-board");
      let result = await db
        .collection("comment")
        .find({ parentId: new ObjectId(req.query.id.toString()) })
        .toArray();

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
    }
  }
}
