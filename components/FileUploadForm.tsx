// components/FileUploadForm.tsx
"use client"; // Make this component a client component
import React, { FormEvent, useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "./ImagePreview";
import axios from "axios";
import classNames from "classnames";

const FileUploadForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [code, setCode] = useState('');

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      setImages(_files);
    }
  };

  const handleCodeChange = (e:FormEvent<HTMLInputElement>) => {
    const value = (e.target as any).value;
    setCode(value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (code === '') {
      return false;
    }

    if (images.length <= 0) {
      return false;
    }

    const formData = new FormData();
    formData.append('code', code);
    images.forEach((image, i) => {
      formData.append(image.name, image);
    });
    setUploading(true);
    await axios.post("/api/upload", formData);
    setUploading(false);

    setImages([]);
    setCode('');
    window.location.reload();
  };
  return (
    <form className="w-full mt-10 p-4" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-between gap-4">
        <input type="text" name="code" className="border border-gray-300 rounded-md p-2" placeholder="Product Code" onChange={handleCodeChange} />
        <CustomFileSelector
          accept="image/png, image/jpeg"
          onChange={handleFileSelected}
        />
        <button
          type="submit"
          className={classNames({
            "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md":
              true,
            "disabled pointer-events-none opacity-40": uploading,
          })}
          disabled={uploading}
        >
          Upload
        </button>
      </div>
      <ImagePreview images={images} />
    </form>
  );
};

export default FileUploadForm;

