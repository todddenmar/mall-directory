"use client";
import React from "react";

import CategoryShopsAccordion from "../accordions/CategoryShopsAccordion";
import SectionTitle from "../custom-ui/SectionTitle";
import { shopCategories } from "../ShopCategories";

function ShopCategoriesSection() {
  return (
    <div className="space-y-4 p-4">
      <SectionTitle>Shop Categories</SectionTitle>
      <div className="grid grid-cols-1 overflow-y-auto h-[400px] gap-2 p-2 border rounded-lg">
        {shopCategories
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((category) => {
            return (
              <CategoryShopsAccordion
                key={`category-shop-list-${category.id}`}
                category={category}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ShopCategoriesSection;
