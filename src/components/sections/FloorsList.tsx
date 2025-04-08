"use client";
import React from "react";
import { Button } from "../ui/button";
import { useAppStore } from "@/lib/store";

function FloorsList() {
  const { currentFloors, currentFloorSelected, setCurrentFloorSelected } =
    useAppStore();
  if (!currentFloorSelected) return <div>No Floor Selected</div>;
  return (
    <section className="grid grid-cols-2 bg-white p-4 md:p-6 rounded-lg md:grid-cols-1 gap-4 justify-between">
      <div className="space-y-2 md:space-y-4">
        <div className="font-medium text-lg md:text-5xl">
          {currentFloorSelected.name}
        </div>
        <p className="text-sm md:text-lg">{currentFloorSelected.description}</p>
      </div>
      <div className="flex flex-col gap-2">
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
