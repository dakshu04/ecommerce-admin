"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(true);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

  const onUpload = (result: CloudinaryUploadWidgetResults) => {
    // result.info can sometimes be a string, undefined, or an object — so we must guard it
    if (typeof result.info === "object" && result.info?.secure_url) {
      onChange(result.info.secure_url);
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>

      <CldUploadWidget onSuccess={onUpload} uploadPreset="gqwkqt5z">
        {({ open }) => {
            const onClick = () => {
                open();
            }
            return (
                <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={onClick}>
                <ImagePlus className="h-4 w-4 mr-2 "/>
                Upload an Image
                </Button>
            )
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
