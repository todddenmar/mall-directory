import React from "react";
import { Checkbox } from "../ui/checkbox";

type CustomCheckboxFieldProps = {
  value: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
  id: string;
};
function CustomCheckboxField({
  value,
  onChange,
  label,
  description,
  id,
}: CustomCheckboxFieldProps) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        checked={value}
        onCheckedChange={(val) =>
          onChange(val === "indeterminate" ? false : (val as boolean))
        }
        id={id}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export default CustomCheckboxField;
