"use client";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GestureLayout from "../layouts/GestureLayout";
import FloorSpotPublic from "../floor-map/FloorSpotPublic";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { TShop } from "@/types";
import EmptyListLayout from "../custom-ui/EmptyListLayout";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { floors } from "@/lib/config";
import SectionTitle from "../custom-ui/SectionTitle";
import LoadingComponent from "../custom-ui/LoadingComponent";

function FloorPlanPublicSection() {
  const {
    currentFloorSelected,
    setCurrentFloorSelected,
    currentShops,
    currentCategories,
  } = useAppStore();

  const [filteredShops, setFilteredShops] = useState<TShop[]>([]);
  const [selectedShop, setSelectedShop] = useState<TShop | undefined>();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput.length > 2) {
      const shopResults = currentShops.filter(
        (item) =>
          item.name
            .toLowerCase()
            .trim()
            .includes(searchInput.toLocaleLowerCase().trim()) ||
          item.tags
            ?.toLowerCase()
            .trim()
            .includes(searchInput.toLocaleLowerCase().trim())
      );
      setFilteredShops(shopResults);
    } else {
      setFilteredShops(currentShops.slice(0, 3));
    }
  }, [searchInput, currentShops]);

  useEffect(() => {
    setFilteredShops(currentShops.slice(0, 3));
  }, [currentShops]);
  if (!currentFloorSelected)
    return (
      <div>
        <LoadingComponent message="Loading..." />
      </div>
    );
  if (currentShops.length === 0)
    return (
      <div>
        <LoadingComponent message="Loading Shops..." />
      </div>
    );
  const { imageURL, name } = currentFloorSelected;
  const floorSpots = currentShops.filter(
    (item) => item.floorID === currentFloorSelected.id
  );

  const getCategory = (id: string) => {
    const category = currentCategories.find((item) => item.id === id);
    return category;
  };

  return (
    <div className="broder flex flex-col flex-1 bg-white relative">
      <div className="flex flex-col gap-4 sticky top-0 w-full p-4 bg-white">
        <div className="grid gap-2">
          <Label>Search</Label>
          <Input
            placeholder="Enter store name or tags"
            value={searchInput}
            onChange={(val) => setSearchInput(val.target.value)}
          />
        </div>
        {filteredShops.length > 0 ? (
          <div className="flex flex-col gap-2 rounded-lg border p-4 shadow-lg">
            {filteredShops.map((item) => {
              return (
                <button
                  key={`shop-result-item-${item.id}`}
                  className="flex gap-4 items-center"
                  onClick={() => {
                    setSelectedShop(item);
                    const floorSelected = floors.find(
                      (floor) => floor.id === item.floorID
                    );
                    if (floorSelected) setCurrentFloorSelected(floorSelected);
                  }}
                >
                  <div
                    className={cn(
                      "relative aspect-square w-[50px] rounded-lg overflow-hidden flex flex-col justify-center items-center",
                      !item.imageURL && "bg-muted"
                    )}
                  >
                    {item.imageURL ? (
                      <Image
                        src={item.imageURL}
                        alt={item.name}
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
                    <div>{item.name}</div>
                    <div className="capitalize">{item.tags}</div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <EmptyListLayout>No Shops Found</EmptyListLayout>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2 overflow-y-auto">
        {currentCategories
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((category) => {
            const shopsByCategory = currentShops.filter(
              (item) => item.categoryID === category.id
            );
            return (
              <div
                key={`category-shop-list-${category.id}`}
                className="bg-white p-4 rounded-lg border space-y-2"
              >
                <SectionTitle>{category.name}</SectionTitle>
                <div className="grid grid-cols-2 gap-1">
                  {shopsByCategory
                    .sort((a, b) => (a.name < b.name ? -1 : 1))
                    .map((item) => {
                      return (
                        <div
                          key={`shop-by-category-${item.id}`}
                          onClick={() => {
                            setSelectedShop(item);
                            const floorSelected = floors.find(
                              (floor) => floor.id === item.floorID
                            );
                            if (floorSelected)
                              setCurrentFloorSelected(floorSelected);
                          }}
                        >
                          {item.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>

      {selectedShop && (
        <Drawer open={true} onOpenChange={() => setSelectedShop(undefined)}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{currentFloorSelected.name}</DrawerTitle>
              <DrawerDescription>
                Double click the shop to view details
              </DrawerDescription>
            </DrawerHeader>

            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex gap-4">
                <div
                  className={cn(
                    "w-[100px] aspect-square relative overflow-hidden rounded-2xl flex flex-col justify-center items-center ",
                    !selectedShop.imageURL && "bg-muted"
                  )}
                >
                  {selectedShop.imageURL ? (
                    <Image
                      src={selectedShop.imageURL}
                      alt={selectedShop.name}
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
                  <div className="font-medium text-lg">{selectedShop.name}</div>
                  {selectedShop.categoryID && (
                    <div>{getCategory(selectedShop.categoryID)?.name}</div>
                  )}
                  <div className="captilize text-sm">{selectedShop.tags}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 overflow-auto gap-4 bg-white md:rounded-lg md:p-4 md:border">
              <GestureLayout>
                <div
                  id="floormap"
                  className="relative scale-100 w-[800px] aspect-square"
                >
                  {floorSpots.map((item) => {
                    return (
                      <button
                        onDoubleClick={() => setSelectedShop(item)}
                        key={`floor-spot-item-${item.id}`}
                      >
                        <FloorSpotPublic
                          shop={item}
                          isActive={selectedShop?.id === item.id}
                        />
                      </button>
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
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

export default FloorPlanPublicSection;
