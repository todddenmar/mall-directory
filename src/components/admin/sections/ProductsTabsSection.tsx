import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsTable } from "@/app/admin/shops/[slug]/data-table";
import { productColumns } from "@/app/admin/shops/[slug]/column";
import { useShopStore } from "@/lib/store";
import ProductCategoriesSection from "./ProductCategoriesSection";

function ProductsTabsSection() {
  const { currentProducts, currentProductCategories } = useShopStore();
  return (
    <Tabs defaultValue="products-table" className="w-full">
      <TabsList>
        <TabsTrigger value="products-table">Products Table</TabsTrigger>
        <TabsTrigger value="product_categories">Categories</TabsTrigger>
      </TabsList>
      <TabsContent value="products-table">
        <ProductsTable columns={productColumns} data={currentProducts} />
      </TabsContent>
      <TabsContent value="product_categories">
        <ProductCategoriesSection
          categories={currentProductCategories}
          products={currentProducts}
        />
      </TabsContent>
    </Tabs>
  );
}

export default ProductsTabsSection;
