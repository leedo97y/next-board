import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (
      req.body.title === "" ||
      req.body.content === "" ||
      req.body.author === ""
    ) {
      return res.status(500).json("please fill whole form !");
    }

    try {
      const client = await connectDB;
      const db = client.db("next-board");
      await db.collection("board").insertOne(req.body);

      return res.redirect(302, "/list");
    } catch (err) {
      console.error(err);
    }
  }
}
