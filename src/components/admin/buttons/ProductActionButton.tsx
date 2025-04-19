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
import { TProduct } from "@/types";
import ConfirmationDialog from "@/components/custom-ui/ConfirmationDialog";
import {
  DB_COLLECTION,
  DB_METHOD_STATUS,
  DB_SUBCOLLECTION,
} from "@/lib/config";
import { dbDeleteSubCollectionDocument } from "@/queries/db-delete";
import { useShopStore } from "@/lib/store";
import { toast } from "sonner";
import UpdateProductForm from "@/components/forms/UpdateProductForm";
type ProductActionButtonProps = {
  product: TProduct;
};
function ProductActionButton({ product }: ProductActionButtonProps) {
  const { currentShop, currentProducts, setCurrentProducts } = useShopStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  if (!currentShop) {
    return <div>No Shop Found</div>;
  }

  const onDelete = async () => {
    setIsLoadingDelete(true);
    const res = await dbDeleteSubCollectionDocument({
      collection: DB_COLLECTION.SHOPS,
      id: currentShop.id,
      subCollection: DB_SUBCOLLECTION.PRODUCTS,
      subCollectionId: product.id,
    });
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      const updatedProducts = currentProducts.filter(
        (item) => item.id != product.id
      );
      setCurrentProducts(updatedProducts);
      toast.success("Deleted product successfully");
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
            <DialogTitle>{product?.name}</DialogTitle>
            <DialogDescription>Edit selected product</DialogDescription>
          </DialogHeader>
          <UpdateProductForm
            product={product}
            setClose={() => setIsOpenEdit(false)}
          />
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={isOpenDelete}
        title="Delete Product?"
        description="This will remove this product"
        setIsOpen={setIsOpenDelete}
        isLoading={isLoadingDelete}
        onConfirm={onDelete}
      />
    </div>
  );
}

export default ProductActionButton;
