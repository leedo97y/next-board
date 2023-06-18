"use client";

export default function TodoBody(props) {
  return (
    <>
      <ul>
        {props.res.map((item) => {
          let id = item._id.toString();

          return (
            <li
              key={id}
              className={
                props.getMode.value !== undefined &&
                (props.getMode.value == "dark" ? "darkListBg" : "")
              }
            >
              <div className="listDiv">
                <div className="contentDataDiv">
                  <p>{item.todo}</p>
                  <span hidden>{item.author}</span>
                  <span hidden>{id}</span>
                </div>
                <div className="contentBtnDiv">
                  <button
                    onClick={(e) => {
                      fetch("/api/todo/delete", {
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
                    ✕
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
