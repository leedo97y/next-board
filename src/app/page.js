export const revalidate = 60;

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import defaultImg from "../../public/image/defaultUserImg.png";

export default async function Home() {
  let session = await getServerSession(authOptions);

  return (
    <div className="main">
      {session ? (
        <div className="mainProfileDiv">
          <Image
            width={50}
            height={50}
            src={session.user.image ? session.user.image : defaultImg}
            alt="profile image"
          />
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
        </div>
      ) : (
        "this is main page"
      )}
    </div>
  );
}
