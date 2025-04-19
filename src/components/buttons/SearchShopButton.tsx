"use client";
import { useAppStore } from "@/lib/store";
import { TShop } from "@/types";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import ShopResultItem from "../list-items/ShopResultItem";
import EmptyListLayout from "../custom-ui/EmptyListLayout";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function SearchShopButton() {
  const { currentShops } = useAppStore();
  const [searchInput, setSearchInput] = useState("");
  const [filteredShops, setFilteredShops] = useState<TShop[]>([]);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  useEffect(() => {
    if (searchInput.length > 2) {
      const shopResults = currentShops.filter(
        (item) =>
          item.name
            .toLowerCase()
            .trim()
            .includes(searchInput.toLocaleLowerCase().trim()) ||
          item.tags
            ?.toLowerCase()
            .trim()
            .includes(searchInput.toLocaleLowerCase().trim())
      );
      setFilteredShops(shopResults);
    } else {
      setFilteredShops(currentShops.slice(0, 3));
    }
  }, [searchInput, currentShops]);
  return (
    <div>
      <Button
        variant={"ghost"}
        onClick={() => setIsOpenSearch(true)}
        size={"icon"}
      >
        <SearchIcon />
      </Button>
      <Dialog open={isOpenSearch} onOpenChange={setIsOpenSearch}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Enter name of the store or tags
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 w-full z-10">
            <div className="grid gap-2 flex-1">
              <Label>Search</Label>
              <Input
                value={searchInput}
                onChange={(val) => setSearchInput(val.target.value)}
              />
            </div>
            {filteredShops.length > 0 ? (
              <div className="flex flex-col gap-2 rounded-lg border h-[200px] overflow-auto p-4 shadow-lg">
                {filteredShops.map((item) => {
                  return (
                    <Link
                      key={`shop-result-item-${item.id}`}
                      href={"/map?shop=" + item.slug}
                      onClick={() => setIsOpenSearch(false)}
                    >
                      <ShopResultItem shop={item} />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <EmptyListLayout>No Shops Found</EmptyListLayout>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchShopButton;
