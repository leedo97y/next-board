import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.body.email === "" || req.body.password === "") {
      return res.redirect(302, "/register");
    }

    try {
      const client = await connectDB;
      const db = client.db("next-board");
      await db.collection("user").insertOne(req.body);

      return res.redirect(302, "/");
    } catch (err) {
      console.error(err);
    }
  }

  return res.status(200).json("hi there");
}
