// dynamic route
import { clientPromise } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail(props) {
  let client = await clientPromise;
  let db = client.db("next-board");
  let param = props.params.id;
  let res = await db.collection("board").findOne({
    _id: new ObjectId(param),
  });

  return (
    <div className="detailMain">
      <h3>Detail Page</h3>
      <div className="detailDiv" key={res.id}>
        <h4>{res.title}</h4>
        <div className="subInfo">
          <span>{res.author ? res.author : "guest"}</span>
        </div>
        <div className="contentDiv">
          <img src={res.imgurl} alt="uploaded image" width={300} height={300} />
          <p>{res.content}</p>
        </div>
      </div>
      <div className="commentsDiv">
        <Comment _id={res._id.toString()} />
      </div>
    </div>
  );
}
