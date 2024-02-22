"use client";

import {
  Cropper,
  CropperRef,
  Coordinates,
  ImageSize,
} from "react-advanced-cropper";

interface Props {
  src: string;
  selectionRect?: Coordinates | null;
  onSelectionChange: (cropper: CropperRef) => void;
}

export default function ImageSelector({
  src,
  selectionRect,
  onSelectionChange,
}: Props) {
  const defaultCoordinates = ({ imageSize }: { imageSize: ImageSize }) => {
    return (
      selectionRect || {
        top: imageSize.width * 0.1,
        left: imageSize.width * 0.1,
        width: imageSize.width * 0.8,
        height: imageSize.height * 0.8,
      }
    );
  };

  return (
    <Cropper
      src={src}
      className={"h-[600px]"}
      stencilProps={{
        overlayClassName: "cropper-overlay",
      }}
      backgroundWrapperProps={{
        scaleImage: false,
        moveImage: false,
      }}
      defaultCoordinates={defaultCoordinates}
      onChange={onSelectionChange}
    />
  );
}
