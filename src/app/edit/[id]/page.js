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
  console.log(props);

  return (
    <div className="editMain">
      <h3>Edit Page</h3>
      {/* <div className="editDiv" key={res.id}>
        <h4>{res.title}</h4>
        <div className="editSubInfo">
          <span>{res.author}</span>
        </div>
        <p>{res.content}</p>
      </div> */}
      <form className="editForm" action="/api/post/edit">
        <div className="inputDiv">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            className="titleInput"
            value={res.title}
            type="text"
          />
          <label htmlFor="author">Author</label>
          <input
            name="author"
            className="authorInput"
            value={res.author}
            type="text"
          />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            className="contentInput"
            value={res.content}
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
