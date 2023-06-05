"use client";

// import { lazy } from "react";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default function ListItem({ res }) {
  // const MyLazyComponent = lazy(() => import("./DetailLink"));

  return (
    <div>
      {res.map((data) => {
        let id = data._id.toString();

        return (
          <div className="listItem" key={id}>
            <Link href={`/detail/${id}`}>
              <h4>{data.title}</h4>
            </Link>
            <div className="listBtns">
              <DetailLink className="detailBtn" id={id} />
              <Link className="editBtn" href={`/edit/${id}`}>
                Edit
              </Link>
              <button
                className="delBtn"
                onClick={(e) => {
                  fetch("/api/post/delete", {
                    method: "POST",
                    body: id,
                  })
                    .then((r) => {
                      r.json();
                    })
                    .then(() => {
                      // console.log(e);
                      e.target.parentElement.parentElement.style.opacity = 0;
                      setTimeout(() => {
                        e.target.parentElement.parentElement.style.display =
                          "none";
                      }, 1000);
                    });
                }}
              >
                Delete
              </button>
            </div>

            <p>{data.author}</p>
          </div>
        );
      })}
    </div>
  );
}
