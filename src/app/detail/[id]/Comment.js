"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);

  const getCommentListFn = () => {
    fetch(`/api/comment/get?id=${props._id}`)
      .then((r) => r.json())
      .then((result) => setData(result));
  };

  useEffect(() => {
    getCommentListFn();
  }, []);

  return (
    <div className="commentDiv">
      <h3>
        Comment <span className="commentLength">{data.length}</span>
      </h3>
      <ul className="commentList">
        {data.map((item) => {
          return (
            <li key={item._id}>
              <div className="commentTextDiv">
                <p>{item.content}</p>
                <span>{item.author}</span>
                <span>
                  {item.date.length != 0
                    ? item.date[0] + " " + item.date[1]
                    : ""}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="commentInputDiv">
        <input
          className={
            "commentInput" + " " + props.getMode.value !== undefined &&
            (props.getMode.value == "dark" ? "dark" : "")
          }
          type="text"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="sendBtn"
          onClick={() => {
            fetch("/api/comment/new", {
              method: "POST",
              body: JSON.stringify({ comment: comment, _id: props._id }),
            })
              .then((r) => r.json())
              .then((result) => {
                getCommentListFn();
              });
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
