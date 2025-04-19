import { useShopStore } from "@/lib/store";
import React from "react";

type ProductCategoryColumnProps = {
  categoryID: string;
};
function ProductCategoryColumn({ categoryID }: ProductCategoryColumnProps) {
  const { currentProductCategories } = useShopStore();
  const category = currentProductCategories.find(
    (item) => item.id === categoryID
  );
  return <div>{category?.name}</div>;
}

export default ProductCategoryColumn;
