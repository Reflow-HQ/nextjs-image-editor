"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface Props {
  getImageData: () => Promise<any>;
  getMaskData: () => Promise<any>;
  onGenerate?: (blob: Blob, prompt: string) => void;
  onGenerateStart?: () => void;
  onGenerateEnd?: () => void;
}

export default function GenerateImage({
  getImageData,
  getMaskData,
  onGenerate,
  onGenerateStart,
  onGenerateEnd,
}: Props) {
  const [prompt, setPrompt] = useState("");

  const canGenerate = !!prompt;

  const onPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const generate = async () => {
    onGenerateStart && onGenerateStart();

    const image = (await getImageData()) as Blob;
    const mask = (await getMaskData()) as Blob;

    if (!image || !mask) return;

    let result, response;

    const formData = new FormData();

    formData.append("image", image);
    formData.append("mask", mask);
    formData.append("prompt", prompt);
    formData.append("response_format", "b64_json");

    try {
      response = await fetch("/images/edit", {
        method: "POST",
        body: formData,
      });

      result = await response.json();

      if (result.error) {
        throw new Error(result.error.message);
      }

      const imageData = result.data[0].b64_json;
      const blob = dataURLToBlob(imageData, "image/png");

      if (onGenerate) {
        onGenerate(blob, prompt);
      }
    } catch (e) {}

    onGenerateEnd && onGenerateEnd();
  };

  const dataURLToBlob = (dataURL: string, type: string) => {
    var binary = atob((dataURL || "").trim());
    var array = new Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }

    return new Blob([new Uint8Array(array)], { type });
  };

  return (
    <div className="flex flex-col grow md:flex-row gap-2">
      <Input type="text" onChange={onPromptChange} />
      <Button disabled={!canGenerate} onClick={generate}>
        Generate
      </Button>
    </div>
  );
}
