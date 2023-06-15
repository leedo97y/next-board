import { NextResponse } from "next/server";

export function middleware(req) {
  console.log(req.nextUrl.pathname);
  console.log(req.headers);
  console.log(req.cookies.get("user-agent"));
  NextResponse.next();
  NextResponse.redirect("http://localhost:3001");
  NextResponse.rewrite("http://localhost:3001");
}
