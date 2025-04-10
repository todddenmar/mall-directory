import React from "react";

import { TShop } from "@/types";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FloorSpotPublicProps = {
  shop: TShop;
  isActive?: boolean;
};
function FloorSpotPublic({ shop, isActive }: FloorSpotPublicProps) {
  return (
    <div
      style={
        shop.imageURL
          ? {
              left: shop.coordinates.x - 25,
              top: shop.coordinates.y - 25,
              position: "absolute",
            }
          : {
              left: shop.coordinates.x - 17,
              top: shop.coordinates.y - 13,
              position: "absolute",
            }
      }
    >
      <Popover open={isActive}>
        <PopoverTrigger asChild>
          {shop.imageURL ? (
            <div
              className={cn(
                "w-[50px] relative bg-white aspect-square border-2 border-white p-2 rounded-lg z-10 overflow-hidden hover:scale-200 hover:z-20 transition duration-100",
                isActive ? "z-20 " : "z-10"
              )}
            >
              <Image
                alt={shop.name}
                src={shop.imageURL}
                fill
                sizes="100%"
                className={cn("object-contain rounded-lg")}
                style={{
                  overflowClipMargin: "unset",
                }}
              />
            </div>
          ) : (
            <div className=" bg-white cursor-pointer rounded-sm text-sm flex items-center gap-2 px-2 py-1 z-10">
              {shop.name}
            </div>
          )}
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="p-2 bg-transparent shadow-none border-none w-fit -mb-2"
        >
          <div className="animate-bounce bg-red-600 text-white rounded-full p-2">
            <ArrowDownIcon />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FloorSpotPublic;
