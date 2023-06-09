"use client";

import { signIn } from "next-auth/react";

export default function LoginBtn() {
  return (
    <button
      className="login"
      onClick={() => {
        signIn();
      }}
    >
      Login
    </button>
  );
}
