"use client";

import ShopActionButton from "@/components/admin/buttons/ShopActionButton";
import ShopCategoryColumn from "@/components/admin/table-components/ShopCategoryColumn";
import { Button } from "@/components/ui/button";
import { floors } from "@/lib/config";
import { TShop } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TShop>[] = [
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
      return <ShopCategoryColumn categoryID={row.getValue("categoryID")} />;
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
    accessorKey: "floorID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Floor
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const floor = floors.find((item) => item.id === row.original.floorID);
      return <div className="capitalize px-3">{floor?.name}</div>;
    },
  },
  {
    id: "action",
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      const shop = row.original as TShop;
      return <ShopActionButton shop={shop} />;
    },
  },
];
