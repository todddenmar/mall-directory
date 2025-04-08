import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TGender } from "@/types";

type GenderDropdownSelectProps = {
  value: string;
  onChange: (value: TGender) => void;
};

const GenderDropdownSelect: React.FC<GenderDropdownSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="MALE">Male</SelectItem>
        <SelectItem value="FEMALE">Female</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default GenderDropdownSelect;
