"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { Button } from "../ui/button";
import { toast } from "sonner";
import LoadingComponent from "../custom-ui/LoadingComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SpotLogoDropzone from "../dropzones/SpotLogoDropzone";
import { TFilePreview, TMediaFile } from "@/types";
import { dbUploadEventMediaFileOnStorage } from "@/queries/db-upload";
import { dbUpdateDocument } from "@/queries/db-update";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";

function GalleryForm() {
  const { currentSettings, setCurrentSettings } = useAppStore();
  const [filesUploaded, setFilesUploaded] = useState<TFilePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<TMediaFile | null>(null);
  const [isShowingImage, setIsShowingImage] = useState(false);
  const onUpload = (val: TFilePreview[]) => {
    setFilesUploaded((prevFiles) => [...prevFiles, ...val]);
  };

  const onSaveImages = async () => {
    if (!currentSettings) return;
    setIsLoading(true);
    const newImages = await Promise.all(
      filesUploaded.map(async (file) => {
        const imageID = crypto.randomUUID();
        const downloadURL = await dbUploadEventMediaFileOnStorage({
          mediaFile: file,
          imageID: imageID,
        });
        const newData: TMediaFile = {
          id: imageID,
          name: file.name,
          type: file.type,
          url: downloadURL,
        };
        return newData;
      })
    );

    const prevImages = currentSettings.galleryImages || [];
    const updatedImages = [...prevImages, ...newImages];

    const res = await dbUpdateDocument(DB_COLLECTION.ROOT, "settings", {
      galleryImages: updatedImages,
    });
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      const updatedEvent = { ...currentSettings, galleryImages: updatedImages };
      setCurrentSettings(updatedEvent);
      toast.success("Images Saved");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap border rounded-lg p-4">
        <div className="flex flex-col items-center justify-center">
          <SpotLogoDropzone onUpload={onUpload} />
        </div>
        {useMemo(
          () =>
            filesUploaded.map((item, idx) => {
              if (item.preview === "") return null;
              return (
                <div
                  key={`preview-image-item-${idx}`}
                  className="rounded-lg bg-white/5 overflow-hidden w-full h-full sm:h-40 sm:w-40"
                >
                  <Image
                    src={item.preview}
                    alt={item.name}
                    className="object-contain h-full w-full"
                    width={160}
                    height={160}
                    style={{
                      overflowClipMargin: "unset",
                    }}
                  />
                </div>
              );
            }),
          [filesUploaded]
        )}
        {currentSettings?.galleryImages?.map((item, idx) => {
          if (item.url === "") return null;
          return (
            <div
              onClick={() => {
                setSelectedImage(item);
                setIsShowingImage(true);
              }}
              key={`gallery-image-item-${idx}`}
              className="rounded-lg bg-white/5 overflow-hidden w-full h-full sm:h-40 sm:w-40 cursor-pointer hover:opacity-80 aspect-square transition-all duration-150"
            >
              <Image
                src={item.url}
                alt={item.name}
                width={160}
                height={160}
                className="object-contain h-full w-full"
                style={{
                  overflowClipMargin: "unset",
                }}
              />
            </div>
          );
        })}

        <Dialog open={isShowingImage} onOpenChange={setIsShowingImage}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>View Image</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {selectedImage && (
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  width={600}
                  height={600}
                  className="object-cover h-full w-full"
                  style={{
                    overflowClipMargin: "unset",
                  }}
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <Button type="button" onClick={onSaveImages}>
          Save Images
        </Button>
      )}
    </div>
  );
}

export default GalleryForm;
