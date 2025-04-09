import React from "react";

import { TShop } from "@/types";

import Image from "next/image";

type FloorSpotPublicProps = {
  shop: TShop;
};
function FloorSpotPublic({ shop }: FloorSpotPublicProps) {
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
          onClick={(e) => {
            e.stopPropagation();
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
          key={`floor-spot-item-${shop.id}`}
          className=" bg-red-500 text-white cursor-pointer rounded-sm text-sm flex items-center gap-2 px-2 py-1 z-10"
        >
          {shop.name}
        </button>
      )}
    </div>
  );
}

export default FloorSpotPublic;
