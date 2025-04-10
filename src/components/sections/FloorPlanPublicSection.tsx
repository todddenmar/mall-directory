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
import { ImageIcon, LayersIcon, MapIcon, ShapesIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { floors } from "@/lib/config";
import LoadingComponent from "../custom-ui/LoadingComponent";
import CategoryShopsAccordion from "../accordions/CategoryShopsAccordion";
import { Button } from "../ui/button";

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
  const [isOpenMap, setIsOpenMap] = useState(false);

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
      <div className="flex flex-col gap-4 sticky top-0 w-full p-4 bg-white z-10">
        <div className="flex items-end gap-4">
          <div className="grid gap-2 flex-1">
            <Label>Search</Label>
            <Input
              placeholder="Enter store name or tags"
              value={searchInput}
              onChange={(val) => setSearchInput(val.target.value)}
            />
          </div>
          <Button type="button" onClick={() => setIsOpenMap(true)}>
            <MapIcon /> View Map
          </Button>
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
                    setIsOpenMap(true);
                    const floorSelected = floors.find(
                      (floor) => floor.id === item.floorID
                    );
                    if (floorSelected) setCurrentFloorSelected(floorSelected);
                  }}
                >
                  <div
                    className={cn(
                      "relative aspect-square w-[50px] border rounded-lg overflow-hidden flex flex-col justify-center items-center",
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

      <div className="flex flex-col flex-1 p-4 gap-2 overflow-y-auto bg-neutral-50 ">
        {currentCategories
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((category) => {
            return (
              <CategoryShopsAccordion
                key={`category-shop-list-${category.id}`}
                category={category}
                onClickShop={(val) => {
                  setSelectedShop(val.shop);
                  if (val.floor) setCurrentFloorSelected(val.floor);
                  setIsOpenMap(true);
                }}
              />
            );
          })}
      </div>

      <Drawer
        open={isOpenMap}
        onOpenChange={() => {
          setIsOpenMap(false);
          setSelectedShop(undefined);
        }}
      >
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <DrawerContent>
          {selectedShop ? (
            <div className="p-2">
              <div className="flex gap-4 shadow-md p-2 rounded-lg">
                <div
                  className={cn(
                    "w-[100px] aspect-square relative border overflow-hidden rounded-2xl flex flex-col justify-center items-center ",
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
                    <div className="flex items-center gap-2">
                      <ShapesIcon size={16} />{" "}
                      {getCategory(selectedShop.categoryID)?.name}
                    </div>
                  )}
                  <div className="captilize text-sm">{selectedShop.tags}</div>
                  <div className="text-sm flex items-center gap-2">
                    <LayersIcon size={16} />
                    {currentFloorSelected.name}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 p-4">
              {floors.map((item) => {
                return (
                  <Button
                    onClick={() => setCurrentFloorSelected(item)}
                    key={`floor-item-${item.id}`}
                    variant={
                      currentFloorSelected.id === item.id
                        ? "default"
                        : "secondary"
                    }
                  >
                    {item.name}
                  </Button>
                );
              })}
            </div>
          )}
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
    </div>
  );
}

export default FloorPlanPublicSection;
