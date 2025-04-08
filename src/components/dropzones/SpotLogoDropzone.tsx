import { TFilePreview } from "@/types";
import { PlusIcon } from "lucide-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type SpotLogoDropzoneProps = {
  onUpload: (val: TFilePreview[]) => void;
};
function SpotLogoDropzone({ onUpload }: SpotLogoDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const previewFiles = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    onUpload(previewFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/heic": [],
      "image/jfif": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="rounded-lg border border-dashed p-4 flex flex-col items-center justify-center aspect-square w-40 cursor-pointer hover:bg-white/5"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <PlusIcon />}
    </div>
  );
}

export default SpotLogoDropzone;
