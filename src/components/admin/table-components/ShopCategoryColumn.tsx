import { useAppStore } from "@/lib/store";
import React from "react";

type ShopCategoryColumnProps = {
  categoryID: string;
};
function ShopCategoryColumn({ categoryID }: ShopCategoryColumnProps) {
  const { currentCategories } = useAppStore();
  const category = currentCategories.find((item) => item.id === categoryID);
  return <div>{category?.name}</div>;
}

export default ShopCategoryColumn;
