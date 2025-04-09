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
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";

function CreateCategoryButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button type="button" onClick={() => setIsOpen(true)}>
        <PlusIcon />
        Create New
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Category</DialogTitle>
            <DialogDescription>
              This will categorize the shops
            </DialogDescription>
          </DialogHeader>
          <CreateCategoryForm setClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateCategoryButton;
