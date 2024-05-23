"use client";
import React, { useState, useEffect, useRef } from "react";
import { S3 } from "aws-sdk";

export default function AddProducts() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [uploadLink, setUploadLink] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

  const inputBrandName = useRef(null);

  const ACCESSKEY = "f28ilb63q187h5h6";
  const SECRETKEY = "7d51a9f2-09ff-4587-8b7a-59b81fd5b612";
  const ENDPOINT = "https://storage.iran.liara.space/Brands";
  const BUCKET = "toolshop";

  const s3 = new S3({
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRETKEY,
    endpoint: ENDPOINT,
  });

  const handleFileChange = async (event) => {
    // setFile(event.target.files[0]);
    // setError(null);
    // setUploadLink(null);
    try {
      if (!event.target.files[0]) {
        setError("Please select a file");
        return;
      }

      const params = {
        Bucket: BUCKET,
        Key: `${Date.now()}_${event.target.files[0].name}`,
        Body: event.target.files[0],
      };

      const response = await s3.upload(params).promise();

      setUploadLink(response.Location);

      // Update list of uploaded files
      setUploadedFiles((prevFiles) => [...prevFiles, response]);

      alert("File uploaded successfully");
    } catch (error) {
      setError("Error uploading file: " + error.message);
    }
  };

  async function addProductHandler(e) {
    e.preventDefault();
    const ReqBody = {
      name: inputBrandName.current.value,
      img: uploadLink,
    };

    const res = await fetch("http://localhost:3000/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ReqBody),
    });
    if (res.status === 201) {
      alert("Added :)");
    }
  }
  return (
    <div className="bg-background flex-1 w-2/3">
      <h3 className="text-3xl font-bold m-4">افزودن برند ها</h3>
      <hr />
      <form onSubmit={addProductHandler}>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input ref={inputBrandName} type="text" className="grow" placeholder="نام برند ..." />
        </label>

        <input type="file" onChange={handleFileChange} />
        <img src={uploadLink} alt="Image" />

        <button className="btn btn-block btn-primary" type="submit">
          افزودن برند
        </button>
      </form>
    </div>
  );
}
