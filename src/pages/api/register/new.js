import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (
      req.body.name === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      return res.status(500).json("please fill whole form !");
    }

    try {
      const client = await connectDB;
      const db = client.db("next-board");
      await db.collection("user").insertOne(req.body);

      return res.redirect(302, "/login");
    } catch (err) {
      console.error(err);
    }
  }

  return res.status(200).json("hi there");
}
