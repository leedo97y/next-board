"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <button
      className="logout"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
  );
}
