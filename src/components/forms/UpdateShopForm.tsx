import { TShop, TTime } from "@/types";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import LoadingComponent from "../custom-ui/LoadingComponent";
import { dbUpdateDocument } from "@/queries/db-update";
import SelectCategory from "../select/SelectCategory";
import CustomCheckboxField from "../custom-ui/CustomCheckboxField";
import { Label } from "../ui/label";
import TimeSchedulePicker from "../custom-ui/TimeSchedulePicker";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  tags: z.string().optional(),
  mobileNumber: z.string().optional(),
});

type UpdateShopFormProps = {
  shop: TShop;
  setClose: () => void;
};
function UpdateShopForm({ setClose, shop }: UpdateShopFormProps) {
  const { currentFloorSelected, currentShops, setCurrentShops } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [opensAt, setOpensAt] = useState<TTime>(
    shop.opensAt || {
      hour: "9",
      minute: "00",
      period: "AM",
    }
  );
  const [closesAt, setClosesAt] = useState<TTime>(
    shop.closesAt || {
      hour: "9",
      minute: "00",
      period: "PM",
    }
  );
  const [isSoonToOpen, setIsSoonToOpen] = useState(false);

  const [categoryID, setCategoryID] = useState<string | undefined>(
    shop.categoryID
  );
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: shop.name,
      description: shop.description || "",
      tags: shop.tags || "",
      mobileNumber: shop.mobileNumber || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!currentFloorSelected) return;
    if (!categoryID) {
      toast.error("Category required");
      return;
    }
    setIsLoading(true);
    const { name, description, tags, mobileNumber } = values;
    const udpates = {
      name: name.trim(),
      description: description,
      tags: tags,
      categoryID,
      mobileNumber: mobileNumber?.trim(),
      opensAt,
      closesAt,
      isSoonToOpen,
    };
    const updatedShop: TShop = {
      ...shop,
      ...udpates,
    };
    const res = await dbUpdateDocument(
      DB_COLLECTION.SHOPS,
      updatedShop.id,
      udpates
    );
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      const updatedShops = currentShops.map((item) =>
        item.id === shop.id ? updatedShop : item
      );
      setCurrentShops(updatedShops);
      toast.success("Shop updated successfully!");
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
    setClose();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <SelectCategory
            label="Category"
            value={categoryID}
            onChange={setCategoryID}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Shop name" {...field} />
                </FormControl>
                <FormDescription>
                  This is the public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about the spot"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="drinks, food, etc" {...field} />
                </FormControl>
                <FormDescription>Please split items by comma.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomCheckboxField
            label="Is soon to open"
            value={isSoonToOpen}
            onChange={setIsSoonToOpen}
            id="soon-to-open"
          />

          <div className="grid gap-2">
            <Label>Opens at</Label>
            <TimeSchedulePicker value={opensAt} onChange={setOpensAt} />
          </div>
          <div className="grid gap-2">
            <Label>Closes at</Label>
            <TimeSchedulePicker value={closesAt} onChange={setClosesAt} />
          </div>
        </div>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}

export default UpdateShopForm;
