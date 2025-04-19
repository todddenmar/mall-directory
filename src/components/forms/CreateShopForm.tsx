import { TCoordinates, TShop, TTime } from "@/types";
import React, { useEffect, useState } from "react";
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
import TimeSchedulePicker from "../custom-ui/TimeSchedulePicker";
import { Label } from "../ui/label";
import CustomCheckboxField from "../custom-ui/CustomCheckboxField";
import _ from "lodash";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  mobileNumber: z.string().optional(),
  slug: z.string().min(2).max(50),
});

type CreateShopFormProps = {
  coordinates: TCoordinates;
  setClose: () => void;
};
function CreateShopForm({ coordinates, setClose }: CreateShopFormProps) {
  const { currentFloorSelected, currentShops, setCurrentShops } = useAppStore();
  const [opensAt, setOpensAt] = useState<TTime>({
    hour: "9",
    minute: "00",
    period: "AM",
  });
  const [closesAt, setClosesAt] = useState<TTime>({
    hour: "9",
    minute: "00",
    period: "PM",
  });
  const [isSoonToOpen, setIsSoonToOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      mobileNumber: "",
      slug: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!currentFloorSelected) return;
    setIsLoading(true);
    const { name, description, mobileNumber, slug } = values;
    const newShop: TShop = {
      id: crypto.randomUUID(),
      name: name.trim(),
      slug: slug.trim(),
      description: description,
      coordinates,
      floorID: currentFloorSelected?.id,
      mobileNumber: mobileNumber?.trim() || "",
      opensAt,
      closesAt,
      isSoonToOpen,
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

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name" && value.name) {
        form.setValue("slug", _.kebabCase(value.name));
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Shop slug" {...field} />
                </FormControl>
                <FormDescription>
                  This is the slug that will be used on the shop page url.
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

export default CreateShopForm;
