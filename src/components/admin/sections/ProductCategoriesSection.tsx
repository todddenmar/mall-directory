import SectionTitle from "@/components/custom-ui/SectionTitle";
import React from "react";
import EmptyListLayout from "@/components/custom-ui/EmptyListLayout";
import CategoryActionButton from "../buttons/CategoryActionButton";
import { TCategory, TProduct } from "@/types";
import CreateCategoryButton from "../buttons/CreateCategoryButton";

type ProductCategoriesSectionProps = {
  products: TProduct[];
  categories: TCategory[];
};
function ProductCategoriesSection({
  products,
  categories,
}: ProductCategoriesSectionProps) {
  console.log({ products });
  return (
    <div className="p-4 rounded-lg border space-y-4 flex flex-col flex-1 overflow-y-auto">
      <div className="flex items-center gap-10">
        <div className="flex-1">
          <SectionTitle>Categories</SectionTitle>
        </div>
        <CreateCategoryButton />
      </div>
      {categories.length > 0 ? (
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col gap-2">
            {categories.map((item) => {
              const categoryProducts = products.filter(
                (catProducts) => catProducts.categoryID === item.id
              );
              return (
                <div
                  key={`category-item-${item.id}`}
                  className="border rounded-lg p-2"
                >
                  <div className="flex justify-between gap-4">
                    <div className="flex flex-1 items-center gap-2">
                      <div className="flex-1">
                        {item.name}
                        <div className="text-xs text-muted-foreground capitalize">
                          {item.tags}
                        </div>
                      </div>
                    </div>
                    <CategoryActionButton category={item} />
                  </div>
                  <div>
                    {categoryProducts.map((product) => {
                      return (
                        <div key={`category-${item.id}-product-${product.id}`}>
                          {product.name}
                        </div>
                      );
                    })}
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

export default ProductCategoriesSection;
