export const revalidate = 60;

import { clientPromise } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { cookies } from "next/headers";
import Image from "next/image";
import defaultImg from "../../public/image/defaultUserImg.png";
import FilteredList from "./FilteredList";
import Todo from "./Todo";

export default async function Home() {
  let session = await getServerSession(authOptions);

  let client = await clientPromise;
  let db = client.db("next-board");
  let res = await db.collection("board").find().toArray();

  let getMode = cookies().get("mode");

  return (
    <div className="main">
      <div className="mainUserDiv">
        <div className="mainProfileDiv">
          <h3>Profile</h3>
          {session ? (
            <div className="profileContentsDiv">
              <Image
                width={50}
                height={50}
                src={session.user.image ? session.user.image : defaultImg}
                alt="profile image"
              />
              <p className="userName">{session.user.name}</p>
              <p className="userEmail">{session.user.email}</p>
            </div>
          ) : (
            "Login first"
          )}
        </div>
        <div className="mainSubContentDiv">
          <div className="todoDiv">
            <Todo session={session} getMode={getMode} />
          </div>
          <div className="weatherDiv"></div>
        </div>
      </div>

      <div className="popularDiv">
        <h3>My contents</h3>
        <div className="popularFilter">
          <FilteredList res={res} session={session} getMode={getMode} />
        </div>
      </div>
    </div>
  );
}
