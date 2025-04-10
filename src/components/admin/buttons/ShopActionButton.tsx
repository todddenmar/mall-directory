import { Button } from "@/components/ui/button";
import { EllipsisIcon } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateShopForm from "@/components/forms/UpdateShopForm";
import { TShop } from "@/types";
import ChooseLogoForm from "@/components/forms/ChooseLogoForm";
import ConfirmationDialog from "@/components/custom-ui/ConfirmationDialog";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import { dbDeleteDocument } from "@/queries/db-delete";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
type ShopActionButtonProps = {
  shop: TShop;
};
function ShopActionButton({ shop }: ShopActionButtonProps) {
  const { currentShops, setCurrentShops } = useAppStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenChooseLogo, setIsOpenChooseLogo] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const onDelete = async () => {
    setIsLoadingDelete(true);
    const res = await dbDeleteDocument({
      collection: DB_COLLECTION.SHOPS,
      id: shop.id,
    });
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      const updatedShops = currentShops.filter((item) => item.id != shop.id);
      setCurrentShops(updatedShops);
      toast.success("Deleted shop successfully");
    }
    setIsLoadingDelete(false);
  };
  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(false);
              setIsOpenEdit(true);
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(false);
              setIsOpenChooseLogo(true);
            }}
          >
            Change Logo
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsOpen(false);
              setIsOpenDelete(true);
            }}
          >
            Delete
          </DropdownMenuItem>
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
      <ConfirmationDialog
        isOpen={isOpenDelete}
        title="Delete Shop?"
        description="This will remove this shop spot"
        setIsOpen={setIsOpenDelete}
        isLoading={isLoadingDelete}
        onConfirm={onDelete}
      />
    </div>
  );
}

export default ShopActionButton;
