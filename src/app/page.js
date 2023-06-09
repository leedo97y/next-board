export const revalidate = 60;

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  let session = await getServerSession(authOptions);

  return (
    <div className="main">
      {session ? (
        <div className="mainProfileDiv">
          <img src={session.user.image} alt="profile image" />
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
        </div>
      ) : (
        "this is main page"
      )}
    </div>
  );
}
