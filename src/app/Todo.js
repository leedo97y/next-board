import { todayDate } from "@/util/addDate";
import { clientPromise } from "@/util/database";
import TodoBody from "./TodoBody";
import LockPage from "./LockPage";

export default async function Todo({ session, getMode }) {
  let client = await clientPromise;
  let db = client.db("next-board");
  let res = await db
    .collection("todo")
    .find({ author: session.user.name })
    .toArray();

  return (
    <div className="todo">
      <h3>Memo</h3>

      <div className="todoListBody">
        {session && session.user.name !== "guest" ? (
          <TodoBody res={res} getMode={getMode} />
        ) : (
          <LockPage />
        )}
        <form className="todoForm" action="/api/todo/new" method="POST">
          <input hidden type="text" name="date" defaultValue={todayDate} />
          <input
            hidden
            type="text"
            name="author"
            defaultValue={session.user.name ? session.user.name : "guest"}
          />
          <input
            type="text"
            className={
              getMode.value !== undefined &&
              (getMode.value == "dark" ? "dark" : "")
            }
            name="todo"
          />
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
}
