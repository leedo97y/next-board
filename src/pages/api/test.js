import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    let today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes().toString().padStart(2, "0");
    let seconds = today.getSeconds().toString().padStart(2, "0");

    return res.status(200).json(`${hour}시 ${minutes}분 ${seconds}초`);
  } else if (req.method === "POST") {
    const client = await connectDB;
    const db = client.db("next-board");
    let result = await db.collection("board").find().toArray();
    result.push(req.body);

    return res.status(200).json(result);
  }

  return res.status(200).json("hi there");
}
