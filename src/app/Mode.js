"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Mode() {
  let router = useRouter();
  useEffect(() => {
    let cookie = ("; " + document.cookie).split(`; mode=`).pop().split(";")[0];
    !cookie && (document.cookie = `mode=light; max-age=${3600 * 24 * 400}`);
  }, []);

  return (
    <div>
      <button
        className="modeBtn"
        onClick={() => {
          let cookie = ("; " + document.cookie)
            .split(`; mode=`)
            .pop()
            .split(";")[0];

          if (cookie === "light") {
            document.cookie = `mode=dark; max-age=${3600 * 24 * 400}`;
            router.refresh();
          } else if (cookie === "dark") {
            document.cookie = `mode=light; max-age=${3600 * 24 * 400}`;
            router.refresh();
          }
        }}
      >
        {("; " + document.cookie).split(`; mode=`).pop().split(";")[0] ===
        "dark"
          ? "☀️"
          : "🌙"}
      </button>
    </div>
  );
}
