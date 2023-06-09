// dynamic route
import { clientPromise } from "@/util/database";
import { ObjectId } from "mongodb";
import ImgUpload from "./ImgUpload";
import { cookies } from "next/headers";

export default async function Edit(props) {
  const client = await clientPromise;
  const db = client.db("next-board");
  const param = props.params.id;
  const res = await db.collection("board").findOne({
    _id: new ObjectId(param),
  });

  let getMode = cookies().get("mode");

  return (
    <div className="editMain">
      <h3>Edit Page</h3>
      <form className="editForm" action={`/api/post/edit`} method="POST">
        <div className="inputDiv">
          <input
            name="_id"
            className="idInput"
            defaultValue={res._id.toString()}
            style={{ display: "none" }}
          />
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className={
              "titleInput" + " " + getMode.value !== undefined &&
              (getMode.value == "dark" ? "dark" : "")
            }
            defaultValue={res.title}
            type="text"
          />
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            className={
              "authorInput" + " " + getMode.value !== undefined &&
              (getMode.value == "dark" ? "dark" : "")
            }
            defaultValue={res.author}
            type="text"
          />
          <ImgUpload />
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className={
              "contentInput" + " " + getMode.value !== undefined &&
              (getMode.value == "dark" ? "dark" : "")
            }
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
