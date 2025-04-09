import React, { useState } from "react";

import { TShop } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";

type FloorSpotPublicProps = {
  shop: TShop;
};
function FloorSpotPublic({ shop }: FloorSpotPublicProps) {
  const [isOpenShop, setIsOpenShop] = useState(false);
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
      {shop.imageURL ? (
        <button
          onDoubleClick={() => {
            setIsOpenShop(true);
          }}
          className="w-[50px] bg-white aspect-square p-2 rounded-lg z-10 overflow-hidden hover:scale-200 hover:z-20 transition duration-100"
        >
          <Image
            alt={shop.name}
            src={shop.imageURL}
            fill
            className="object-contain rounded-lg"
            style={{
              overflowClipMargin: "unset",
            }}
          />
        </button>
      ) : (
        <button
          onDoubleClick={() => {
            setIsOpenShop(true);
          }}
          className=" bg-red-500 text-white cursor-pointer rounded-sm text-sm flex items-center gap-2 px-2 py-1 z-10"
        >
          {shop.name}
        </button>
      )}
      <Dialog open={isOpenShop} onOpenChange={setIsOpenShop}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{shop.name}</DialogTitle>
            <DialogDescription>{shop.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FloorSpotPublic;
