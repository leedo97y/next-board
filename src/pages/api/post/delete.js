import { connectDB } from "@/util/database";
const ObjectId = require("mongodb").ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const client = await connectDB;
    const db = client.db("next-board");

    console.log(req);

    await db.collection("board").deleteOne({ _id: new ObjectId(req.body) });

    res.status(200).json("success !");
  }
}
