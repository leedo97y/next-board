import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    req.body.role = "basic";

    if (
      req.body.author === "" ||
      req.body.email === "" ||
      req.body.password === ""
    ) {
      return res.status(500).json("please fill whole form !");
    }

    console.log();

    try {
      const client = await connectDB;
      const database = client.db("next-board");

      req.body.password = await bcrypt.hash(req.body.password, 10);

      let user = await database.collection("user").insertOne(req.body);

      return res.redirect(302, "/");
    } catch (err) {
      console.error(err);
    }
  }
}
