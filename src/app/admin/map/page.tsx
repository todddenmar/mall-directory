"use client";
import FloorPlanSection from "@/components/sections/FloorPlanSection";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import React from "react";

function AdminMapPage() {
  const { currentFloors, currentFloorSelected, setCurrentFloorSelected } =
    useAppStore();

  if (!currentFloorSelected) return <div>No Floor Selected</div>;
  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-lg border flex-1">
      <div className="flex items-center lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
        {currentFloors
          .map((item) => {
            const isActive = item.id === currentFloorSelected.id;
            return (
              <Button
                className="w-full"
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
      <div className="flex-1 overflow-auto">
        <FloorPlanSection />
      </div>
    </div>
  );
}

export default AdminMapPage;
