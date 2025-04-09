"use client";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateShopForm from "../forms/CreateShopForm";
import { MapPinIcon } from "lucide-react";
import GestureLayout from "../layouts/GestureLayout";
import FloorSpotAdmin from "../floor-map/FloorSpotAdmin";

function FloorPlanSection() {
  const { currentFloorSelected, currentShops } = useAppStore();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const clickedInside = target.closest("#floormap");

    if (!clickedInside) {
      console.log("Clicked outside of floormap — ignoring");
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setIsOpenCreate(true);
    setCoords({ x, y });
  };
  if (!currentFloorSelected) return <div>No Floor Selected</div>;
  const { imageURL, name } = currentFloorSelected;
  const floorSpots = currentShops.filter(
    (item) => item.floorID === currentFloorSelected.id
  );

  return (
    <div className="flex flex-col w-fit flex-1 overflow-auto gap-4 bg-white md:rounded-lg md:p-4 md:border">
      <GestureLayout>
        <div
          id="floormap"
          className="relative scale-100 w-[800px] aspect-square bg-neutral-200"
          onClick={handleClick}
        >
          {coords ? (
            <span
              className="-ml-[9px] -mt-[9px] text-red-500"
              style={{ left: coords.x, top: coords.y, position: "absolute" }}
            >
              <MapPinIcon size={18} />
            </span>
          ) : null}
          {floorSpots.map((item) => (
            <FloorSpotAdmin key={`floor-spot-item-${item.id}`} shop={item} />
          ))}
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

      <Dialog
        open={isOpenCreate}
        onOpenChange={() => {
          setIsOpenCreate(false);
          setCoords(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Spot</DialogTitle>
            <DialogDescription>
              This will create a new spot in {currentFloorSelected.name}
            </DialogDescription>
          </DialogHeader>
          {coords && (
            <CreateShopForm
              coordinates={coords}
              setClose={() => {
                setIsOpenCreate(false);
                setCoords(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FloorPlanSection;
