import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppStore } from "@/lib/store";
import { TCategory, TFloor, TShop } from "@/types";
import { floors } from "@/lib/config";

type CategoryShopsAccordionProps = {
  category: TCategory;
  onClickShop: ({ shop, floor }: { shop: TShop; floor: TFloor }) => void;
};
function CategoryShopsAccordion({
  category,
  onClickShop,
}: CategoryShopsAccordionProps) {
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
        <AccordionTrigger>{category.name}</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-1 gap-2 ">
            {shopsByCategory
              .sort((a, b) => (a.name < b.name ? -1 : 1))
              .map((item) => {
                const floorSelected = floors.find(
                  (floor) => floor.id === item.floorID
                );
                return (
                  <div
                    key={`shop-by-category-${item.id}`}
                    className="p-2 rounded-lg justify-between items-start w-full flex cursor-pointer hover:underline hover:text-red-500"
                    onClick={() =>
                      floorSelected
                        ? onClickShop({ shop: item, floor: floorSelected })
                        : null
                    }
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {floorSelected?.name}
                    </div>
                  </div>
                );
              })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CategoryShopsAccordion;
