"use client";

import Image from "next/image";
import { useState } from "react";

export default function Write() {
  let [imgurl, setImgurl] = useState("");

  return (
    <div>
      <h3 className="writeTitle">Write page</h3>
      <form
        className="writeForm"
        action={`/api/post/new?url=${imgurl}`}
        method="POST"
      >
        <div className="inputDiv">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" className="titleInput" type="text" />
          <label htmlFor="image">Image Upload</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              let file = e.target.files[0];
              let fileName = encodeURIComponent(file.name);
              let result = await fetch(`/api/post/image?file=${fileName}`);
              result = await result.json();

              const formData = new FormData();
              Object.entries({ ...result.fields, file }).forEach(
                ([key, value]) => {
                  formData.append(key, value);
                }
              );
              let uploadResult = await fetch(result.url, {
                method: "POST",
                body: formData,
              });
              // console.log(uploadResult);
              uploadResult.ok && setImgurl(uploadResult.url + "/" + fileName);
            }}
          />
          {imgurl && (
            <img src={imgurl} alt="Uploaded Image" width={200} height={200} />
          )}

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            className="contentInput"
            cols="50"
            rows="10"
          />
        </div>
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
