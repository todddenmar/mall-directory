import SectionTitle from "@/components/custom-ui/SectionTitle";
import React from "react";
import CreateCategoryButton from "../buttons/CreateCategoryButton";
import EmptyListLayout from "@/components/custom-ui/EmptyListLayout";
import { useAppStore } from "@/lib/store";
import CategoryActionButton from "../buttons/CategoryActionButton";

function CategoriesSection() {
  const { currentCategories } = useAppStore();
  return (
    <div className="p-4 rounded-lg border space-y-4 flex flex-col flex-1 overflow-y-auto">
      <div className="flex items-center gap-10">
        <SectionTitle>Categories</SectionTitle>
        <CreateCategoryButton />
      </div>
      {currentCategories.length > 0 ? (
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col gap-2">
            {currentCategories.map((item) => {
              return (
                <div
                  key={`category-item-${item.id}`}
                  className="border rounded-lg bg-black/5 p-2 flex gap-4"
                >
                  <div className="flex-1">
                    <div>{item.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">
                      {item.tags}
                    </div>
                  </div>
                  <CategoryActionButton category={item} />
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
