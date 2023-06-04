import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  const client = await connectDB;
  const db = client.db("next-board");
  const res = await db.collection("board").find().toArray();
  console.log(res);
  return (
    <div className="listMain">
      {res.map((data) => {
        let id = data._id.toString();

        console.log(id);
        return (
          <div className="listItem" key={id}>
            <Link href={`/detail/${id}`}>
              <h4>{data.title}</h4>
            </Link>
            <div className="listBtns">
              <DetailLink id={id} />
              <Link className="editBtn" href={`/edit/${id}`}>
                Edit
              </Link>
            </div>

            <p>{data.author}</p>
          </div>
        );
      })}
    </div>
  );
}
