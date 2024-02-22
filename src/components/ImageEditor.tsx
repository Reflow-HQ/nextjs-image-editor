"use client";

import { useState, useRef } from "react";

import {
  CropperRef,
  FixedCropperRef,
  FixedCropper,
  ImageRestriction,
  Coordinates,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { createCanvas, drawImage, getCanvasData, drawMask } from "@/lib/canvas";

import ImageSelector from "@/components/ImageSelector";

import Navigation from "@/components/Navigation";
import LoaderIcon from "@/components/icons/LoaderIcon";

interface Props {
  canGenerateEdits: boolean;
  createEdit?: (prompt: string) => void;
}

export default function ImageEditor({ canGenerateEdits, createEdit }: Props) {
  const cropperRef = useRef<FixedCropperRef>(null);

  const [selectionRect, setSelectionRect] = useState<Coordinates | null>();

  const [src, setSrc] = useState(
    "https://images.unsplash.com/photo-1707197066378-36583db5e892?q=80&w=1740&auto=format&fit=crop"
  );
  const [mode, setMode] = useState("crop");
  const [isLoading, setIsLoading] = useState(false);

  const isGenerating = mode === "generate";

  const crop = async () => {
    const imageSrc = await getCroppedImageSrc();

    if (imageSrc) {
      setSrc(imageSrc);
      setMode("generate");
    }
  };

  const onUpload = (imageSrc: string) => {
    setSrc(imageSrc);
    setMode("crop");
  };

  const onGenerate = (imageSrc: string, prompt: string) => {
    createEdit && createEdit(prompt);
    setSrc(imageSrc);
  };

  const onDownload = async () => {
    if (isGenerating) {
      downloadImage(src);
      return;
    }

    const imageSrc = await getCroppedImageSrc();

    if (imageSrc) {
      downloadImage(imageSrc);
    }
  };

  const downloadImage = (objectUrl: string) => {
    const linkElement = document.createElement("a");
    linkElement.download = "image.png";
    linkElement.href = objectUrl;
    linkElement.click();
  };

  const getCroppedImageSrc = async () => {
    if (!cropperRef.current) return;

    const canvas = cropperRef.current.getCanvas({
      height: 1024,
      width: 1024,
    });

    if (!canvas) return;

    const blob = (await getCanvasData(canvas)) as Blob;

    return blob ? URL.createObjectURL(blob) : null;
  };

  const onSelectionChange = (cropper: CropperRef) => {
    setSelectionRect(cropper.getCoordinates());
  };

  const getImageData = async () => {
    if (!src) return;

    const canvas = createCanvas();
    await drawImage(canvas, src);

    return getCanvasData(canvas);
  };

  const getMaskData = async () => {
    if (!src || !selectionRect) return;

    const canvas = createCanvas();

    await drawImage(canvas, src);
    drawMask(canvas, selectionRect);

    return getCanvasData(canvas);
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full bg-slate-950 rounded-lg overflow-hidden">
        {isGenerating ? (
          <ImageSelector
            src={src}
            selectionRect={selectionRect}
            onSelectionChange={onSelectionChange}
          />
        ) : (
          <FixedCropper
            src={src}
            ref={cropperRef}
            className={"h-[600px]"}
            stencilProps={{
              movable: false,
              resizable: false,
              lines: false,
              handlers: false,
            }}
            stencilSize={{
              width: 600,
              height: 600,
            }}
            imageRestriction={ImageRestriction.stencil}
          />
        )}
        <Navigation
          mode={mode}
          onUpload={onUpload}
          onDownload={onDownload}
          onCrop={crop}
          canGenerateEdit={canGenerateEdits}
          onGenerate={onGenerate}
          onGenerateStart={() => setIsLoading(true)}
          onGenerateEnd={() => setIsLoading(false)}
          getImageData={getImageData}
          getMaskData={getMaskData}
        />
      </div>
      {isLoading && (
        <div className="absolute w-full h-full flex items-center justify-center bg-slate-900/50">
          <LoaderIcon />
        </div>
      )}
    </div>
  );
}
