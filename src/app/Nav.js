import Link from "next/link";
import { connectDB } from "@/util/database";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import defaultImg from "../../public/image/defaultUserImg.png";

export default async function Nav() {
  let session = await getServerSession(authOptions);

  let client = await connectDB;
  const database = client.db("next-board");
  const res = await database.collection("user").find().toArray();

  console.log(res);

  return (
    <div className="nav">
      <div className="basicPage">
        <Link href="/" className="logo">
          BoarDo
        </Link>
        <Link href="/list">List</Link>
        <Link href="/write">Write</Link>
      </div>
      <div className="userPage">
        {session ? (
          <div className="profileDiv">
            <Image
              width={50}
              height={50}
              className="profileImg"
              src={session.user.image ? session.user.image : defaultImg}
              alt="profile image"
            />
            <div className="profileTextDiv">
              <p>{session.user.name}</p>
              <p>{session.user.email}</p>
            </div>
            <LogoutBtn />
          </div>
        ) : (
          <div>
            <Link href="/register">Register</Link>
            <LoginBtn />
          </div>
        )}
      </div>
    </div>
  );
}
