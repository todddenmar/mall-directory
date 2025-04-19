import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { TShop } from "@/types";
import CreateProductForm from "@/components/forms/CreateProductForm";

type CreateProductButtonProps = {
  shop: TShop;
};
function CreateProductButton({ shop }: CreateProductButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button type="button" onClick={() => setIsOpen(true)}>
        <PlusIcon />
        Create New Product
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Product</DialogTitle>
            <DialogDescription>
              Please fill the required fields
            </DialogDescription>
          </DialogHeader>
          <CreateProductForm shop={shop} setClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateProductButton;
