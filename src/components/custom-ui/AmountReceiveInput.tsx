import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type AmountReceiveInputProps = {
  value: string;
  onChange: (val: string) => void;
  feeAmount: number;
};
function AmountReceiveInput({
  value,
  onChange,
  feeAmount,
}: AmountReceiveInputProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Amount Received</Label>
        <Input
          placeholder="Enter amount received"
          type="number"
          value={value}
          onChange={(val) => onChange(val.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Change</Label>
        <Input
          disabled={true}
          value={(parseInt(value || "0") - feeAmount).toString()}
        />
      </div>
    </div>
  );
}

export default AmountReceiveInput;
