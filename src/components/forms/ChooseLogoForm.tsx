import { useAppStore } from "@/lib/store";
import { TShop } from "@/types";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Label } from "../ui/label";
import LoadingComponent from "../custom-ui/LoadingComponent";
import { Button } from "../ui/button";
import { dbUpdateDocument } from "@/queries/db-update";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ChooseLogoFormProps = {
  shop: TShop;
  setClose: () => void;
};
function ChooseLogoForm({ shop, setClose }: ChooseLogoFormProps) {
  const { currentSettings, currentShops, setCurrentShops } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState<string | null>(
    shop.imageURL || null
  );
  const onSaveLogo = async () => {
    if (!selectedImageURL) {
      toast.error("No image selected");
      return;
    }
    setIsLoading(true);
    const res = await dbUpdateDocument(DB_COLLECTION.SHOPS, shop.id, {
      imageURL: selectedImageURL,
    });
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      const updatedShops = currentShops.map((item) =>
        item.id === shop.id ? { ...shop, imageURL: selectedImageURL } : item
      );
      setCurrentShops(updatedShops || []);
      toast.success("Logo updated");
    }
    setIsLoading(false);
    setClose();
  };
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div>
        <div className="h-[150px] aspect-square rounded-lg bg-neutral-100 flex flex-col items-center justify-center relative overflow-hidden">
          {selectedImageURL ? (
            <Image
              alt={shop.name}
              src={selectedImageURL}
              fill
              sizes="100%"
              className="object-contain"
            />
          ) : (
            <ImageIcon />
          )}
        </div>
      </div>

      <div className="space-y-2 w-full">
        <Label>Choose from gallery:</Label>
        <div className="overflow-y-auto h-[300px]">
          <div className="border rounded-lg p-4 flex-1 grid grid-cols-4 gap-2 w-full ">
            {currentSettings.galleryImages?.map((item) => {
              const isActive = item.url === selectedImageURL;
              return (
                <button
                  onClick={() => {
                    setSelectedImageURL(item.url);
                  }}
                  key={`gallery-item-${item.id}`}
                  className={cn(
                    "w-full aspect-square relative rounded-lg overflow-hidden",
                    isActive && "border-2"
                  )}
                >
                  <Image
                    alt={item.name}
                    src={item.url}
                    fill
                    sizes="100%"
                    className="object-contain"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="w-full grid grid-cols-2 gap-4">
          <Button type="button" variant={"destructive"} onClick={setClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onSaveLogo}>
            Update Logo
          </Button>
        </div>
      )}
    </div>
  );
}

export default ChooseLogoForm;
