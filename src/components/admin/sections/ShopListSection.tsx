"use client";
import { useAppStore } from "@/lib/store";
import React from "react";

function ShopListSection() {
  const { currentShops } = useAppStore();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 border">
      {currentShops
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map((item) => {
          return (
            <div key={`shop-item-${item.id}`} className="p-4 rounded-lg border">
              {item.name}
            </div>
          );
        })}
    </div>
  );
}

export default ShopListSection;
