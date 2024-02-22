"use client";

import { useRef } from "react";
import { FiUpload, FiDownload } from "react-icons/fi";

import Button from "@/components/Button";
import IconButton from "@/components/icons/IconButton";
import GenerateImage from "@/components/GenerateImage";

interface Props {
  mode?: string;
  onDownload?: () => void;
  onUpload?: (blob: string) => void;
  onCrop: () => void;
  onGenerate?: (blob: string, prompt: string) => void;
  onGenerateStart?: () => void;
  onGenerateEnd?: () => void;
  canGenerateEdit: boolean;
  getImageData: () => Promise<any>;
  getMaskData: () => Promise<any>;
}

export default function Navigation({
  onUpload,
  onCrop,
  onGenerate,
  onGenerateStart,
  onGenerateEnd,
  onDownload,
  canGenerateEdit,
  getImageData,
  getMaskData,
  mode,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const onLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files && files[0]) {
      if (onUpload) {
        onUpload(URL.createObjectURL(files[0]));
      }
    }

    event.target.value = "";
  };

  const onGenerateImage = (blob: Blob, prompt: string) => {
    if (onGenerate) {
      onGenerate(URL.createObjectURL(blob), prompt);
    }
  };

  return (
    <div className="flex justify-between bg-slate-900 p-5">
      <IconButton title="Upload image" onClick={onUploadButtonClick}>
        <FiUpload />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="hidden"
        />
      </IconButton>
      <div className="flex grow items-center justify-center gap-2 mx-20">
        {mode === "crop" && <Button onClick={onCrop}>Crop</Button>}
        {mode === "generate" && (
          <>
            {canGenerateEdit ? (
              <GenerateImage
                getImageData={getImageData}
                getMaskData={getMaskData}
                onGenerate={onGenerateImage}
                onGenerateStart={onGenerateStart}
                onGenerateEnd={onGenerateEnd}
              />
            ) : (
              <p className="text-slate-400">
                Upgrade to another subscription plan to edit more images.
              </p>
            )}
          </>
        )}
      </div>
      <IconButton title="Download image" onClick={onDownload}>
        <FiDownload />
      </IconButton>
    </div>
  );
}
