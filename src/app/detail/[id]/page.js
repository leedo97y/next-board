// dynamic route
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Detail(props) {
  const client = await connectDB;
  const db = client.db("next-board");
  const param = props.params.id;
  const res = await db.collection("board").findOne({
    _id: new ObjectId(param),
  });
  console.log(props);

  return (
    <div className="detailMain">
      <h3>Detail Page</h3>
      <div className="detailDiv" key={res.id}>
        <h4>{res.title}</h4>
        <div className="subInfo">
          <span>{res.author}</span>
        </div>
        <p>{res.content}</p>
      </div>
    </div>
  );
}
