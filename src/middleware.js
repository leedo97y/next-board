import "datejs";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  let session = await getToken({ req: req });
  // console.log(session);

  if (req.nextUrl.pathname.startsWith("/write")) {
    if (session === null) {
      return NextResponse.redirect("http://localhost:3001/api/auth/signin");
    }
  }
}
