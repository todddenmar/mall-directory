import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { TShop } from "@/types";
import { ImageIcon, LayersIcon, ShapesIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type ShopInfoCardProps = {
  shop: TShop;
};
function ShopInfoCard({ shop }: ShopInfoCardProps) {
  const { currentCategories, currentFloorSelected } = useAppStore();
  const getCategory = (id: string) => {
    const category = currentCategories.find((item) => item.id === id);
    return category;
  };
  return (
    <div className="p-2">
      <div className="flex gap-4 shadow-md p-2 rounded-lg">
        <div
          className={cn(
            "w-[100px] aspect-square relative border overflow-hidden rounded-2xl flex flex-col justify-center items-center ",
            !shop.imageURL && "bg-muted"
          )}
        >
          {shop.imageURL ? (
            <Image
              src={shop.imageURL}
              alt={shop.name}
              fill
              sizes="100%"
              className="object-contain"
              style={{
                overflowClipMargin: "unset",
              }}
            />
          ) : (
            <ImageIcon size={20} />
          )}
        </div>
        <div>
          <div className="font-medium text-lg">{shop.name}</div>
          <div className="capitalize text-sm text-muted-foreground">
            {shop.tags}
          </div>
          {shop.categoryID && (
            <div className="flex items-center gap-2">
              <ShapesIcon size={16} /> {getCategory(shop.categoryID)?.name}
            </div>
          )}
          <div className="text-sm flex items-center gap-2">
            <LayersIcon size={16} />
            {currentFloorSelected?.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopInfoCard;
