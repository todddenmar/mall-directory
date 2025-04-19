import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppStore } from "@/lib/store";
import { TShopCategory } from "@/types";
import { floors } from "@/lib/config";
import Link from "next/link";

type CategoryShopsAccordionProps = {
  category: TShopCategory;
};
function CategoryShopsAccordion({ category }: CategoryShopsAccordionProps) {
  const { currentShops } = useAppStore();
  const shopsByCategory = currentShops.filter(
    (item) => item.categoryID === category.id
  );
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-white rounded-lg border px-4"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2">
            {category.icon}
            {category.name}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-2 ">
            {shopsByCategory
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((item) => {
                const floorSelected = floors.find(
                  (floor) => floor.id === item.floorID
                );
                return (
                  <Link
                    href={`/map?shop=${item.slug}`}
                    key={`shop-by-category-${item.id}`}
                    className="p-2 rounded-lg justify-between items-start w-full flex cursor-pointer hover:underline hover:text-red-500"
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {floorSelected?.name}
                    </div>
                  </Link>
                );
              })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CategoryShopsAccordion;
