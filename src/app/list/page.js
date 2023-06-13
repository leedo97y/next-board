import { clientPromise } from "@/util/database";
import ListItem from "./ListItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

export default async function List() {
  let client = await clientPromise;
  let db = client.db("next-board");
  let res = await db.collection("board").find().toArray();

  let session = await getServerSession(authOptions);

  return (
    <div className="listMain">
      <ListItem res={res} session={session} />
    </div>
  );
}
