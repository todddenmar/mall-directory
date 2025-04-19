"use client";
import LoadingComponent from "@/components/custom-ui/LoadingComponent";
import { Badge } from "@/components/ui/badge";
import { floors } from "@/lib/config";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import _ from "lodash";
import { ImageIcon, LayersIcon, ShapesIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

function ShopPage() {
  const params = useParams();
  const slug = params.slug;
  const { currentShops, currentCategories } = useAppStore();
  const getCategory = (id: string) => {
    const category = currentCategories.find((item) => item.id === id);
    return category;
  };
  const shop = currentShops.find((item) => item.slug === slug);
  const floor = floors.find((item) => item.id === shop?.floorID);

  if (!shop) return <LoadingComponent />;

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-4 items-start">
        <div
          className={cn(
            "w-[80px] h-[80px] aspect-square relative border overflow-hidden rounded-2xl flex flex-col justify-center items-center ",
            !shop.imageURL && "bg-muted"
          )}
        >
          {shop.imageURL ? (
            <Image
              src={shop.imageURL}
              alt={shop.name}
              fill
              sizes="100%"
              className="object-contain object-center"
              style={{
                overflowClipMargin: "unset",
              }}
            />
          ) : (
            <ImageIcon size={20} />
          )}
        </div>
        <div className="space-y-1">
          <div>
            <div className="font-medium text-lg">{shop.name}</div>
            <div className="capitalize text-sm text-muted-foreground">
              {shop.tags}
            </div>
          </div>
          {shop.categoryID && (
            <div className="flex items-center text-sm gap-2">
              <ShapesIcon size={16} /> {getCategory(shop.categoryID)?.name}
            </div>
          )}
          {shop.opensAt && shop.closesAt && (
            <div className="text-sm text-muted-foreground">{`${shop.opensAt.hour}:${shop.opensAt.minute} ${shop.opensAt.period} - ${shop.closesAt.hour}:${shop.closesAt.minute} ${shop.closesAt.period}`}</div>
          )}
          <div className="flex items-center gap-2">
            <Badge>
              <LayersIcon size={16} />
              {floor?.name}
            </Badge>
            {shop.isSoonToOpen && (
              <Badge variant={"destructive"}>Soon to open</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
