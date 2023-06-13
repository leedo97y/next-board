"use client";

import { useState } from "react";

export default function ImgUpload() {
  let [imgurl, setImgurl] = useState("");

  return (
    <div className="uploadImgDiv">
      <label htmlFor="image">Upload Image</label>
      <input
        id="image"
        name="image"
        className="imageInput"
        type="file"
        accept="image/*"
        onChange={async (e) => {
          let file = e.target.files[0];
          let fileName = file.name;
          let result = await fetch(`/api/post/image?file=${fileName}`);
          result = await result.json();

          const formData = new FormData();
          Object.entries({ ...result.fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
          });
          let uploadResult = await fetch(result.url, {
            method: "POST",
            body: formData,
          });
          uploadResult.ok
            ? setImgurl(uploadResult.url + "/" + fileName)
            : console.log("fail");
        }}
      />
      <input
        name="imgurl"
        type="text"
        defaultValue={imgurl}
        style={{ display: "none" }}
      />
      {imgurl && (
        <img src={imgurl} alt="uploaded image" width={200} height={200} />
      )}
    </div>
  );
}
