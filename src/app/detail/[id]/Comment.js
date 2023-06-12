"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`/api/comment/get?id=${props._id}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
      });
  }, []);

  return (
    <div>
      <ul className="commentList">
        {
          <li key={props._id}>
            <div>
              <p>{}</p>
              <span>{}</span>
            </div>
          </li>
        }
      </ul>
      <input
        className="commentInput"
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
          });
        }}
      >
        Send
      </button>
    </div>
  );
}
