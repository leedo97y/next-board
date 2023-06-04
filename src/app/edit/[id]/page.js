// dynamic route
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  const client = await connectDB;
  const db = client.db("next-board");
  const param = props.params.id;
  const res = await db.collection("board").findOne({
    _id: new ObjectId(param),
  });

  // await db.collection("board").updateOne(
  //   { _id: new ObjectId(param) },
  //   {
  //     $set: {
  //       //
  //     },
  //   }
  // );

  return (
    <div className="editMain">
      <h3>Edit Page</h3>
      <form className="editForm" action="/api/post/new" method="POST">
        <div className="inputDiv">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            className="titleInput"
            defaultValue={res.title}
            type="text"
          />
          <label htmlFor="author">Author</label>
          <input
            name="author"
            className="authorInput"
            defaultValue={res.author}
            type="text"
          />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            className="contentInput"
            defaultValue={res.content}
            cols="50"
            rows="10"
          />
        </div>
        <button className="submitBtn" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
}
