import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import LoadingComponent from "./LoadingComponent";

type ConfirmationDialogProps = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  title?: ReactNode;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  content?: ReactNode;
  isLoading?: boolean;
};
function ConfirmationDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  onConfirm,
  confirmText,
  content,
  isLoading,
}: ConfirmationDialogProps) {
  const handleConfirm = async () => {
    if (isLoading) return; // Prevent closing if loading
    onConfirm();
    setIsOpen(false); // Close only after confirmation logic is done
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(val) => !isLoading && setIsOpen(val)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div>{content}</div>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <AlertDialogFooter className="grid grid-cols-2 gap-4">
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {confirmText || "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmationDialog;
