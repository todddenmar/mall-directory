"use client";
import CategoriesSection from "@/components/admin/sections/CategoriesSection";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useAppStore } from "@/lib/store";

function AdminShopsPage() {
  const { currentShops } = useAppStore();
  return (
    <div className="flex flex-col flex-1 h-full overflow-y-auto">
      <div className="grid lg:grid-cols-4 gap-4 border p-4 rounded-lg bg-white flex-1 overflow-y-auto">
        <CategoriesSection />
        <div className="lg:col-span-3 w-full overflow-x-auto">
          <DataTable columns={columns} data={currentShops} />
        </div>
      </div>
    </div>
  );
}

export default AdminShopsPage;
