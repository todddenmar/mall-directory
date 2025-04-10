import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useAppStore } from "@/lib/store";
type SelectCategoryProps = {
  label?: string;
  value: string | undefined;
  onChange: (val: string) => void;
};
function SelectCategory({ label, value, onChange }: SelectCategoryProps) {
  const { currentCategories } = useAppStore();
  return (
    <div className="grid gap-2">
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {currentCategories
            .sort((a, b) => (a.name < b.name ? -1 : 1))
            .map((item) => {
              return (
                <SelectItem
                  key={`select-category-item-${item.id}`}
                  value={item.id}
                >
                  {item.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCategory;
