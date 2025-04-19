"use client";
import ShopInfoCard from "@/components/cards/ShopInfoCard";
import EmptyListLayout from "@/components/custom-ui/EmptyListLayout";
import LoadingComponent from "@/components/custom-ui/LoadingComponent";
import FloorSpotPublic from "@/components/floor-map/FloorSpotPublic";
import GestureLayout from "@/components/layouts/GestureLayout";
import { Button } from "@/components/ui/button";
import { floors } from "@/lib/config";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

function MapPage() {
  const params = useSearchParams();
  const slug = params.get("shop");
  const { currentShops } = useAppStore();
  const shop = currentShops.find((item) => item.slug === slug);
  const floorSpots = currentShops.filter(
    (item) => item.floorID === shop?.floorID
  );
  const floor = floors.find((item) => item.id === shop?.floorID);
  if (!shop) return <LoadingComponent />;

  return (
    <div className="flex flex-col gap-2">
      <ShopInfoCard shop={shop} />

      {floor ? (
        <GestureLayout>
          <div className="relative scale-100 w-[800px] aspect-square">
            {floorSpots.map((item) => {
              return (
                <Link
                  href={`/map?shop=${item.slug}`}
                  key={`floor-spot-item-${item.id}`}
                >
                  <FloorSpotPublic
                    shop={item}
                    isActive={shop?.id === item.id}
                  />
                </Link>
              );
            })}
            <Image
              alt={floor?.name}
              src={floor?.imageURL}
              priority
              width={800}
              height={800}
              className="object-center"
            />
          </div>
        </GestureLayout>
      ) : (
        <EmptyListLayout>Floor not found</EmptyListLayout>
      )}
      <div className="px-2">
        <Link href={`/shops/${shop.slug}`}>
          <Button className="w-full" type="button">
            View Shop Page
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MapPage;
