"use client";

import { Button } from "@/components/ui/button";
import { TProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductCategoryColumn from "@/components/admin/table-components/ProductCategoryColumn";
import { convertCurrency } from "@/lib/utils";
import ProductActionButton from "@/components/admin/buttons/ProductActionButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const productColumns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize px-3">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "categoryID",
    header: () => <div className="">Category</div>,
    cell: ({ row }) => {
      return <ProductCategoryColumn categoryID={row.getValue("categoryID")} />;
    },
  },
  {
    accessorKey: "tags",
    header: () => <div className="">Tags</div>,
    cell: ({ row }) => {
      return <div className="">{row.getValue("tags")}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize px-3">
          {convertCurrency(row.getValue("price"))}
        </div>
      );
    },
  },
  {
    accessorKey: "isAvailable",
    header: () => <div className="">Product Status</div>,
    cell: ({ row }) => {
      return (
        <div className="">
          {row.getValue("isAvailable") ? (
            <Badge className="bg-green-500">Available</Badge>
          ) : (
            <Badge variant={"destructive"}>Unavailable</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "action",
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      const product = row.original as TProduct;
      return <ProductActionButton product={product} />;
    },
  },
];
