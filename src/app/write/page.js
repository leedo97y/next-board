import { cookies } from "next/headers";
import WriteForm from "./WriteForm";

// import Image from "next/image";

export default function Write() {
  let getMode = cookies().get("mode");

  return (
    <div>
      <h3 className="writeTitle">Write page</h3>
      <WriteForm getMode={getMode} />
    </div>
  );
}
