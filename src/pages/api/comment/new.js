import { clientPromise } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { todayDate, todayTime } from "@/util/addDate";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    console.log(req.body);

    let saveComment = {
      content: req.body.comment,
      parentId: new ObjectId(req.body._id),
      author: session ? session.user.name : "guest",
      date: [todayDate, todayTime],
    };

    if (req.body.comment === "") {
      return res.status(500).json("please fill whole form !");
    }

    try {
      let client = await clientPromise;
      let db = client.db("next-board");
      let result = await db.collection("comment").insertOne(saveComment);

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
    }
  }
}
