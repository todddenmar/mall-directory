import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { TShop } from "@/types";
import { ImageIcon, LayersIcon, ShapesIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { floors } from "@/lib/config";

type ShopInfoCardProps = {
  shop: TShop;
};
function ShopInfoCard({ shop }: ShopInfoCardProps) {
  const { currentCategories } = useAppStore();
  const getCategory = (id: string) => {
    const category = currentCategories.find((item) => item.id === id);
    return category;
  };
  const floor = floors.find((item) => item.id === shop?.floorID);

  return (
    <div className="p-2 space-y-2">
      <div className="flex gap-4 shadow-md p-2 rounded-lg">
        <div
          className={cn(
            "w-[80px] h-[80px] aspect-square relative border overflow-hidden rounded-2xl flex flex-col justify-center items-center ",
            !shop.imageURL && "bg-muted"
          )}
        >
          {shop.imageURL ? (
            <Image
              src={shop.imageURL}
              alt={shop.name}
              fill
              sizes="100%"
              className="object-contain object-center"
              style={{
                overflowClipMargin: "unset",
              }}
            />
          ) : (
            <ImageIcon size={20} />
          )}
        </div>
        <div className="space-y-1">
          <div>
            <div className="font-medium text-lg">{shop.name}</div>
            <div className="capitalize text-sm text-muted-foreground">
              {shop.tags}
            </div>
          </div>
          {shop.categoryID && (
            <div className="flex items-center text-sm gap-2">
              <ShapesIcon size={16} /> {getCategory(shop.categoryID)?.name}
            </div>
          )}
          {shop.opensAt && shop.closesAt && (
            <div className="text-sm text-muted-foreground">{`${shop.opensAt.hour}:${shop.opensAt.minute} ${shop.opensAt.period} - ${shop.closesAt.hour}:${shop.closesAt.minute} ${shop.closesAt.period}`}</div>
          )}
          <div className="flex items-center gap-2">
            <Badge>
              <LayersIcon size={16} />
              {floor?.name}
            </Badge>
            {shop.isSoonToOpen && (
              <Badge variant={"destructive"}>Soon to open</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopInfoCard;
