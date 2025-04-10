"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

function FloorsList() {
  const {
    currentFloors,
    currentFloorSelected,
    setCurrentFloorSelected,
    currentCategories,
  } = useAppStore();

  const [categoryID, setCategoryID] = useState<string | undefined>();
  const onChangeFloor = (val: string) => {
    const selected = currentFloors.find((item) => item.id === val);
    if (selected) setCurrentFloorSelected(selected);
  };
  if (!currentFloorSelected) return <div>No Floor Selected</div>;

  return (
    <section className="grid  bg-white p-4 lg:p-6 rounded-lg gap-4 justify-between w-full grid-cols-1">
      <div className="space-y-2 lg:space-y-4">
        <div className="flex gap-2 lg:hidden">
          <div className="grid gap-2 ">
            <Label>Select Floor</Label>
            <Select
              value={currentFloorSelected?.id}
              onValueChange={onChangeFloor}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Floor" />
              </SelectTrigger>
              <SelectContent>
                {currentFloors.map((item) => {
                  return (
                    <SelectItem
                      key={`select-item-floor-${item.id}`}
                      value={item.id}
                    >
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 ">
            <Label>Categories in this floor</Label>
            <Select value={categoryID} onValueChange={setCategoryID}>
              <SelectTrigger>
                <SelectValue placeholder="Select Floor" />
              </SelectTrigger>
              <SelectContent>
                {currentCategories.map((item) => {
                  return (
                    <SelectItem
                      key={`select-item-category-${item.id}`}
                      value={item.id}
                    >
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="hidden lg:block font-medium text-lg lg:text-4xl">
          {currentFloorSelected.name}
        </div>
      </div>
      <div className="flex-col gap-2 hidden lg:flex">
        {currentFloors
          .map((item) => {
            const isActive = item.id === currentFloorSelected.id;
            return (
              <Button
                onClick={() => setCurrentFloorSelected(item)}
                key={`floor-item-${item.id}`}
                variant={isActive ? "default" : "secondary"}
              >
                {item.name}
              </Button>
            );
          })
          .reverse()}
      </div>
    </section>
  );
}

export default FloorsList;
