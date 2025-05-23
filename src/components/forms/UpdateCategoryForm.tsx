import { TCategory } from "@/types";
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
import { useShopStore } from "@/lib/store";
import { toast } from "sonner";
import { DB_COLLECTION, DB_METHOD_STATUS } from "@/lib/config";
import LoadingComponent from "../custom-ui/LoadingComponent";
import { dbUpdateSubCollectionDocument } from "@/queries/db-update";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  tags: z.string().optional(),
});

type UpdateCategoryFormProps = {
  category: TCategory;
  setClose: () => void;
};
function UpdateCategoryForm({ setClose, category }: UpdateCategoryFormProps) {
  const { currentShop, currentProductCategories, setCurrentProductCategories } =
    useShopStore();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
      description: category.description || "",
      tags: category.tags || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!currentShop) return;
    setIsLoading(true);
    const { name, description, tags } = values;
    const updates = {
      name: name.trim(),
      description: description?.trim() || "",
      tags: tags?.trim() || "",
    };
    const updatedCategory: TCategory = {
      ...category,
      ...updates,
    };
    const res = await dbUpdateSubCollectionDocument(
      DB_COLLECTION.SHOPS,
      currentShop.id,
      DB_COLLECTION.CATEGORIES,
      category.id,
      updates
    );
    if (res.status === DB_METHOD_STATUS.SUCCESS) {
      const updatedCategories = currentProductCategories.map((item) =>
        item.id === category.id ? updatedCategory : item
      );
      setCurrentProductCategories(updatedCategories);
      toast.success("Category updated successfully!");
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
                  <Input placeholder="Category name" {...field} />
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
                    placeholder="Tell us a little bit about the category"
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

export default UpdateCategoryForm;
