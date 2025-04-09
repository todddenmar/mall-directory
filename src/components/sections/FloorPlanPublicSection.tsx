"use client";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import React from "react";
import GestureLayout from "../layouts/GestureLayout";
import FloorSpotPublic from "../floor-map/FloorSpotPublic";

function FloorPlanPublicSection() {
  const { currentFloorSelected, currentShops } = useAppStore();

  if (!currentFloorSelected) return <div>No Floor Selected</div>;
  const { imageURL, name } = currentFloorSelected;
  const floorSpots = currentShops.filter(
    (item) => item.floorID === currentFloorSelected.id
  );

  return (
    <div className="flex flex-col flex-1 overflow-auto gap-4 bg-white md:rounded-lg md:p-4 md:border">
      <GestureLayout>
        <div
          id="floormap"
          className="relative scale-100 w-[800px] aspect-square bg-neutral-200"
        >
          {floorSpots.map((item) => {
            return (
              <FloorSpotPublic key={`floor-spot-item-${item.id}`} shop={item} />
            );
          })}
          <Image
            alt={name}
            src={imageURL}
            priority
            width={800}
            height={800}
            className="object-center"
          />
        </div>
      </GestureLayout>
    </div>
  );
}

export default FloorPlanPublicSection;
