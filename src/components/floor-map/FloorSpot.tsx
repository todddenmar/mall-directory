import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TShop } from "@/types";
import UpdateShopForm from "../forms/UpdatedShopForm";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import ChooseLogoForm from "../forms/ChooseLogoForm";
import Image from "next/image";
import { Protect } from "@clerk/nextjs";
type FloorSpotProps = {
  shop: TShop;
};
function FloorSpot({ shop }: FloorSpotProps) {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenChooseLogo, setIsOpenChooseLogo] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  return (
    <div
      style={
        shop.imageURL
          ? {
              left: shop.coordinates.x - 25,
              top: shop.coordinates.y - 25,
              position: "absolute",
            }
          : {
              left: shop.coordinates.x - 17,
              top: shop.coordinates.y - 13,
              position: "absolute",
            }
      }
    >
      <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropdown}>
        <DropdownMenuTrigger asChild>
          {shop.imageURL ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDropdown(true);
              }}
              className=" w-[50px] aspect-square rounded-lg z-10 overflow-hidden hover:scale-200 hover:z-20 transition duration-100"
            >
              <Image
                alt={shop.name}
                src={shop.imageURL}
                fill
                className="object-contain"
              />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenDropdown(true);
              }}
              key={`floor-spot-item-${shop.id}`}
              className=" bg-red-500 text-white cursor-pointer rounded-sm text-sm flex items-center gap-2 px-2 py-1 z-10"
            >
              {shop.name}
            </button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{shop.name}</DropdownMenuLabel>
          <Protect permission="org:admin:access">
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setIsOpenDropdown(false);
                setIsOpenEdit(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsOpenDropdown(false);
                setIsOpenChooseLogo(true);
              }}
            >
              Change Logo
            </DropdownMenuItem>
          </Protect>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isOpenEdit} onOpenChange={setIsOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{shop?.name}</DialogTitle>
            <DialogDescription>Edit selected shop</DialogDescription>
          </DialogHeader>
          <UpdateShopForm
            shop={shop}
            setClose={() => {
              setIsOpenEdit(false);
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={isOpenChooseLogo} onOpenChange={setIsOpenChooseLogo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{shop?.name}</DialogTitle>
            <DialogDescription>Edit selected shop logo</DialogDescription>
          </DialogHeader>
          <ChooseLogoForm
            shop={shop}
            setClose={() => setIsOpenChooseLogo(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FloorSpot;
