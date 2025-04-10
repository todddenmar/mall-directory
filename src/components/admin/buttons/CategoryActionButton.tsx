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
import { TCategory } from "@/types";
import ConfirmationDialog from "@/components/custom-ui/ConfirmationDialog";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import { dbDeleteDocument } from "@/queries/db-delete";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import UpdateCategoryForm from "@/components/forms/UpdateCategoryForm";
type CategoryActionButtonProps = {
  category: TCategory;
};
function CategoryActionButton({ category }: CategoryActionButtonProps) {
  const { currentCategories, setCurrentCategories } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const onDelete = async () => {
    setIsLoadingDelete(true);
    const res = await dbDeleteDocument({
      collection: DB_COLLECTION.CATEGORIES,
      id: category.id,
    });
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      const updatedCategories = currentCategories.filter(
        (item) => item.id != category.id
      );
      setCurrentCategories(updatedCategories);
      toast.success("Deleted category successfully");
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
            <DialogTitle>{category?.name}</DialogTitle>
            <DialogDescription>Edit selected shop</DialogDescription>
          </DialogHeader>
          <UpdateCategoryForm
            category={category}
            setClose={() => {
              setIsOpenEdit(false);
            }}
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

export default CategoryActionButton;
