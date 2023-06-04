"use client";

import { useRouter } from "next/navigation";

export default function DetailLink(props) {
  const route = useRouter();
  return (
    <button
      onClick={() => {
        route.push(`/detail/${props.id}`);
      }}
    >
      Detail page
    </button>
  );
}
