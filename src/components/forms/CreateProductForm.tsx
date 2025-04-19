import { TCoordinates, TProduct, TShop, TTime } from "@/types";
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
import { toast } from "sonner";
import { dbSetSubCollectionDocument } from "@/queries/db-create";
import {
  DB_COLLECTION,
  DB_METHOD_STATUS,
  DB_SUBCOLLECTION,
} from "@/lib/config";
import LoadingComponent from "../custom-ui/LoadingComponent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomCheckboxField from "../custom-ui/CustomCheckboxField";
import { useShopStore } from "@/lib/store";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.string().min(2).max(50),
  compareAtPrice: z.string().optional(),
  description: z.string().optional(),
});

type CreateProductFormProps = {
  shop: TShop;
  setClose: () => void;
};
function CreateProductForm({ shop, setClose }: CreateProductFormProps) {
  const { currentProductCategories } = useShopStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  // 1. Define your form.
  const [categoryID, setCategoryID] = useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      compareAtPrice: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    const { name, description, price, compareAtPrice } = values;
    const newProduct: TProduct = {
      id: crypto.randomUUID(),
      categoryID: categoryID || null,
      name: name.trim(),
      description: description,
      price: parseInt(price || "0"),
      compareAtPrice: parseInt(compareAtPrice || "0"),
      createdAt: new Date().toISOString(),
      isAvailable,
    };
    const res = await dbSetSubCollectionDocument(
      DB_COLLECTION.SHOPS,
      shop.id,
      DB_SUBCOLLECTION.PRODUCTS,
      newProduct.id,
      newProduct
    );
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      toast.success("Product added successfully!");
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
          <Select value={categoryID} onValueChange={setCategoryID}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {currentProductCategories.map((item) => {
                return (
                  <SelectItem key={`category-item-${item.id}`} value={item.id}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product/Service name" {...field} />
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="compareAtPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compare At Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Compare at price"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will be the price that will be compared to the selling
                  price
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomCheckboxField
            label="Is available"
            value={isAvailable}
            onChange={setIsAvailable}
            id="out-of-stock"
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

export default CreateProductForm;
