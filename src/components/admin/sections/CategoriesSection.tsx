import SectionTitle from "@/components/custom-ui/SectionTitle";
import React from "react";
import CreateCategoryButton from "../buttons/CreateCategoryButton";
import EmptyListLayout from "@/components/custom-ui/EmptyListLayout";
import { useAppStore } from "@/lib/store";

function CategoriesSection() {
  const { currentCategories } = useAppStore();
  return (
    <div className="p-4 rounded-lg border space-y-4">
      <div className="flex items-center gap-10">
        <SectionTitle>Categories</SectionTitle>
        <CreateCategoryButton />
      </div>
      {currentCategories.length > 0 ? (
        currentCategories.map((item) => {
          return (
            <div
              key={`category-item-${item.id}`}
              className="border rounded-lg bg-black/5 p-4"
            >
              <div>{item.name}</div>
              <div className="text-sm text-muted-foreground capitalize">
                {item.tags}
              </div>
            </div>
          );
        })
      ) : (
        <EmptyListLayout>No categories yet</EmptyListLayout>
      )}
    </div>
  );
}

export default CategoriesSection;
