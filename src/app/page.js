export const revalidate = 60;

import { clientPromise } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import defaultImg from "../../public/image/defaultUserImg.png";
import FilteredList from "./FilteredList";

export default async function Home() {
  let session = await getServerSession(authOptions);

  let client = await clientPromise;
  let db = client.db("next-board");
  let res = await db.collection("board").find().toArray();

  return (
    <div className="main">
      <div className="mainProfileDiv">
        {session ? (
          <div className="profileContentsDiv">
            <h3>Profile</h3>
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
        <div className="userPageDiv">
          <button>mypage</button>
        </div>
      </div>
      <div className="popularDiv">
        <div className="popularFilter">
          <h3>My contents</h3>
          <FilteredList res={res} session={session} />
        </div>
      </div>
    </div>
  );
}
