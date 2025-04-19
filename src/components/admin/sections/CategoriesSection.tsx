import SectionTitle from "@/components/custom-ui/SectionTitle";
import React from "react";
import EmptyListLayout from "@/components/custom-ui/EmptyListLayout";
import { shopCategories } from "@/components/ShopCategories";

function CategoriesSection() {
  return (
    <div className="p-4 rounded-lg border space-y-4 flex flex-col flex-1 overflow-y-auto">
      <div className="flex items-center gap-10">
        <SectionTitle>Categories</SectionTitle>
      </div>
      {shopCategories.length > 0 ? (
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col gap-2">
            {shopCategories.map((item) => {
              return (
                <div
                  key={`category-item-${item.id}`}
                  className="border rounded-lg bg-black/5 p-2 flex gap-4"
                >
                  <div className="flex flex-1 items-center gap-2">
                    <span>{item.icon}</span>
                    <div className="flex-1">
                      {item.name}
                      <div className="text-xs text-muted-foreground capitalize">
                        {item.tags}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyListLayout>No categories yet</EmptyListLayout>
      )}
    </div>
  );
}

export default CategoriesSection;
