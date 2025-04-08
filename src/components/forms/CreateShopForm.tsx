import { TCoordinates, TShop } from "@/types";
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
import { dbSetDocument } from "@/queries/db-create";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import LoadingComponent from "../custom-ui/LoadingComponent";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
});

type CreateShopFormProps = {
  coordinates: TCoordinates;
  setClose: () => void;
};
function CreateShopForm({ coordinates, setClose }: CreateShopFormProps) {
  const { currentFloorSelected, currentShops, setCurrentShops } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!currentFloorSelected) return;
    setIsLoading(true);
    const { name, description } = values;
    const newShop: TShop = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description,
      coordinates,
      floorID: currentFloorSelected?.id,
    };
    const res = await dbSetDocument(DB_COLLECTION.SHOPS, newShop.id, newShop);
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      const updatedShops = [...currentShops, newShop];
      setCurrentShops(updatedShops);
      toast.success("Shop added successfully!");
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

export default CreateShopForm;
