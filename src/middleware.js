import "datejs";
import { NextResponse } from "next/server";

export function middleware(req) {
  if (req.nextUrl.pathname === "/") {
    console.log(new Date().toString("yyyy-MM-dd HH:mm:ss"));
    console.log(req.headers);
    return NextResponse.next();
  }
}
