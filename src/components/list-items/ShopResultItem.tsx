import { cn } from "@/lib/utils";
import { TShop } from "@/types";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
type ShopResultItemProps = {
  shop: TShop;
};
function ShopResultItem({ shop }: ShopResultItemProps) {
  return (
    <button className="flex gap-4 items-center">
      <div
        className={cn(
          "relative aspect-square w-[50px] border rounded-lg overflow-hidden flex flex-col justify-center items-center",
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
          <ImageIcon size={16} />
        )}
      </div>
      <div className="flex flex-col items-start">
        <div>{shop.name}</div>
        <div className="capitalize text-sm truncate text-muted-foreground">
          {shop.tags}
        </div>
      </div>
    </button>
  );
}

export default ShopResultItem;
