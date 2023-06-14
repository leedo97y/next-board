import Link from "next/link";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";
import Image from "next/image";
import defaultImg from "../../public/image/defaultUserImg.png";
import Mode from "./Mode";

export default async function Nav({ session }) {
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
            <Mode />
          </div>
        ) : (
          <div className="profileDiv">
            <Link href="/register">Register</Link>
            <LoginBtn />
            <Mode />
          </div>
        )}
      </div>
    </div>
  );
}
