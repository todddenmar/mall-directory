"use client";
import PageTitle from "@/components/custom-ui/PageTitle";
import FloorSpotPublic from "@/components/floor-map/FloorSpotPublic";
import GestureLayout from "@/components/layouts/GestureLayout";
import { Button } from "@/components/ui/button";
import { floors } from "@/lib/config";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
function FloorsPage() {
  const { currentShops } = useAppStore();
  const [floor, setFloor] = useState(floors[0]);
  const floorSpots = currentShops.filter((item) => item.floorID === floor.id);

  if (!floor) return <div>No Floor Found</div>;
  return (
    <div className="flex flex-col flex-1 lg:flex-row gap-4 lg:p-4">
      <div className=" bg-white rounded-lg lg:w-full lg:max-w-sm">
        <div className="px-4 py-2">
          <PageTitle>Floors</PageTitle>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 p-4 bg-white">
          {floors.map((item) => {
            return (
              <Button
                onClick={() => setFloor(item)}
                key={`floor-item-${item.id}`}
                variant={floor.id === item.id ? "default" : "secondary"}
              >
                {item.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden flex-1 flex flex-col">
        <GestureLayout>
          <div className="relative scale-100 w-[800px] aspect-square">
            {floorSpots.map((item) => {
              return (
                <Link
                  href={`/shops/${item.slug}`}
                  key={`floor-spot-item-${item.id}`}
                >
                  <FloorSpotPublic shop={item} />
                </Link>
              );
            })}
            <Image
              alt={floor.name}
              src={floor.imageURL}
              priority
              width={800}
              height={800}
              className="object-center"
            />
          </div>
        </GestureLayout>
      </div>
    </div>
  );
}

export default FloorsPage;
