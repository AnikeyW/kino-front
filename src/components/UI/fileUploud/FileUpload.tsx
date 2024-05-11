import React, { useRef } from "react";

interface IFileUploadProps {
  setFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  name: string;
  children: React.ReactNode;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  setFile,
  accept,
  name,
  children,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div onClick={() => ref.current?.click()} style={{ height: "100%" }}>
      <input
        ref={ref}
        type="file"
        name={name}
        accept={accept}
        style={{ display: "none" }}
        onChange={setFile}
      />
      {children}
    </div>
  );
};

export default FileUpload;
