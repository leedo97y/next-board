"use client";

// filter your content

import Link from "next/link";
import DetailLink from "@/app/list/DetailLink";

export default function FilteredList({ res, session, getMode }) {
  return (
    <div>
      {res.map((data) => {
        let id = data._id.toString();

        return (
          <div className="filterListDiv" key={id}>
            {session.user.name === data.author ? (
              <div
                className={
                  "filterlistItem" + " " + getMode.value !== undefined &&
                  (getMode.value == "dark" ? "darkListBg" : "")
                }
                key={id}
              >
                <Link href={`/detail/${id}`}>
                  <h4>{data.title}</h4>
                </Link>
                {session ? (
                  <div className="filterlistBtns">
                    <DetailLink className="filterdetailBtn" id={id} />
                    {session.user.name === data.author ? (
                      <div className="filtereditDelBtn">
                        <Link className="filtereditBtn" href={`/edit/${id}`}>
                          Edit
                        </Link>
                        <button
                          className="filterdelBtn"
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
                  <div className="filterlistBtns">
                    <DetailLink className="filterdetailBtn" id={id} />
                  </div>
                )}

                <p>{data.author ? data.author : "guest"}</p>
              </div>
            ) : (
              <div style={{ margin: 0, padding: 0, display: "hidden" }}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
