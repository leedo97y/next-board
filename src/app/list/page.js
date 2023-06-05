import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const dynamic = "force-dynamic";

export default async function List() {
  let client = await connectDB;
  const db = client.db("next-board");
  const res = await db.collection("board").find().toArray();

  return (
    <div className="listMain">
      <ListItem res={res} />
    </div>
  );
}
