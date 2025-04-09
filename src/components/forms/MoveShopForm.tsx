import { TCoordinates, TShop } from "@/types";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  MoveDownIcon,
  MoveLeftIcon,
  MoveRightIcon,
  MoveUpIcon,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { dbUpdateDocument } from "@/queries/db-update";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import { toast } from "sonner";
import LoadingComponent from "../custom-ui/LoadingComponent";

type MoveShopFormProps = {
  shop: TShop;
  setClose: () => void;
};
type TDirection = "left" | "right" | "up" | "down";
function MoveShopForm({ shop, setClose }: MoveShopFormProps) {
  const { currentShops, setCurrentShops } = useAppStore();
  const [newCoordinates, setNewCoordinates] = useState(shop.coordinates);
  const [isLoading, setIsLoading] = useState(false);

  const onMove = (direction: TDirection) => {
    let updatedShop = shop;
    switch (direction) {
      case "up":
        const updatedUp: TCoordinates = {
          x: shop.coordinates.x,
          y: shop.coordinates.y - 1,
        };
        updatedShop = { ...shop, coordinates: updatedUp };
        break;
      case "down":
        const updatedDown: TCoordinates = {
          x: shop.coordinates.x,
          y: shop.coordinates.y + 1,
        };
        updatedShop = { ...shop, coordinates: updatedDown };
        break;
      case "left":
        const updatedLeft: TCoordinates = {
          x: shop.coordinates.x - 1,
          y: shop.coordinates.y,
        };
        updatedShop = { ...shop, coordinates: updatedLeft };
        break;
      case "right":
        const updatedRight: TCoordinates = {
          x: shop.coordinates.x + 1,
          y: shop.coordinates.y,
        };
        updatedShop = { ...shop, coordinates: updatedRight };
        break;
    }
    setNewCoordinates(updatedShop.coordinates);
    console.log({ updatedShop });
    const updatedShops = currentShops.map((item) =>
      item.id === shop.id ? updatedShop : item
    );
    setCurrentShops(updatedShops);
  };

  const onSave = async () => {
    setIsLoading(true);
    const res = await dbUpdateDocument(DB_COLLECTION.SHOPS, shop.id, {
      coordinates: newCoordinates,
    });
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      toast.success("Shop location moved");
    }
    setIsLoading(false);
    setClose();
  };
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex flex-col items-center gap-2 flex-1">
        <Button onClick={() => onMove("up")} size={"icon"} type="button">
          <MoveUpIcon />
        </Button>

        <div className="grid grid-cols-3">
          <Button onClick={() => onMove("left")} size={"icon"} type="button">
            <MoveLeftIcon />
          </Button>
          <div></div>
          <Button onClick={() => onMove("right")} size={"icon"} type="button">
            <MoveRightIcon />
          </Button>
        </div>
        <Button onClick={() => onMove("down")} size={"icon"} type="button">
          <MoveDownIcon />
        </Button>
      </div>
      <div className="p-4">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <Button className="w-full" type="button" onClick={onSave}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
}

export default MoveShopForm;
