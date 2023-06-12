"use client";

import Link from "next/link";
import DetailLink from "./DetailLink";

export default function ListItem({ res, session }) {
  return (
    <div>
      {res.map((data) => {
        let id = data._id.toString();

        return (
          <div className="listItem" key={id}>
            <Link href={`/detail/${id}`}>
              <h4>{data.title}</h4>
            </Link>
            {session ? (
              <div className="listBtns">
                <DetailLink className="detailBtn" id={id} />
                {session.user.name === data.author ? (
                  <div className="editDelBtn">
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
                            e.target.parentElement.parentElement.parentElement.style.opacity = 0;
                            setTimeout(() => {
                              e.target.parentElement.parentElement.parentElement.style.display =
                                "none";
                            }, 1000);
                          });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="listBtns">
                <DetailLink className="detailBtn" id={id} />
              </div>
            )}

            <p>{data.author ? data.author : "guest"}</p>
          </div>
        );
      })}
    </div>
  );
}
