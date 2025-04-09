"use client";
import CategoriesSection from "@/components/admin/sections/CategoriesSection";
import React from "react";

function AdminShopsPage() {
  return (
    <div className="flex gap-4 border p-4 rounded-lg bg-white">
      <CategoriesSection />
      <div className="flex-1"></div>
    </div>
  );
}

export default AdminShopsPage;
