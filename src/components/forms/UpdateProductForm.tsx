import { TProduct } from "@/types";
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
import {
  DB_COLLECTION,
  DB_METHOD_STATUS,
  DB_SUBCOLLECTION,
} from "@/lib/config";
import LoadingComponent from "../custom-ui/LoadingComponent";
import CustomCheckboxField from "../custom-ui/CustomCheckboxField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShopStore } from "@/lib/store";
import { dbUpdateSubCollectionDocument } from "@/queries/db-update";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.string().min(2).max(50),
  compareAtPrice: z.string().optional(),
  description: z.string().optional(),
  mobileNumber: z.string().optional(),
});

type UpdateProductFormProps = {
  product: TProduct;
  setClose: () => void;
};
function UpdateProductForm({ product, setClose }: UpdateProductFormProps) {
  const { currentProductCategories, currentShop } = useShopStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(product.isAvailable);
  const [categoryID, setCategoryID] = useState<string | undefined>(
    product.categoryID || undefined
  );
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      price: product.price.toString() || "0",
      compareAtPrice: product.compareAtPrice?.toString() || "0",
      description: product.description,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!currentShop) {
      console.log("shop not found");
      return;
    }
    setIsLoading(true);
    const { name, description, price, compareAtPrice } = values;
    const updates = {
      categoryID: categoryID || null,
      name: name.trim(),
      description: description,
      price: parseInt(price || "0"),
      compareAtPrice: parseInt(compareAtPrice || "0"),
      isAvailable,
    };

    const res = await dbUpdateSubCollectionDocument(
      DB_COLLECTION.SHOPS,
      currentShop.id,
      DB_SUBCOLLECTION.PRODUCTS,
      product.id,
      updates
    );
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      toast.success("Product updated successfully!");
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

export default UpdateProductForm;
