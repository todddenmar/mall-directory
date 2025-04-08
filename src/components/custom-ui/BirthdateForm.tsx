import DayDropdownSelect from "@/components/custom-ui/DayDropdownSelect";
import MonthDropdownSelect from "@/components/custom-ui/MonthDropdownSelect";
import YearDropdownSelect from "@/components/custom-ui/YearDropdownSelect";
import React, { useEffect, useState } from "react";

type BirthdateFormProps = {
  value: Date | undefined;
  onChange: (val: Date) => void;
};

function BirthdateForm({ value, onChange }: BirthdateFormProps) {
  const endYear = new Date().getFullYear();

  // Initialize state based on the value prop or defaults
  const [year, setYear] = useState<number>(
    value ? value.getFullYear() : endYear
  );
  const [month, setMonth] = useState<number>(value ? value.getMonth() + 1 : 1);
  const [day, setDay] = useState<number>(value ? value.getDate() : 1);

  // Calculate the number of days in a given month/year
  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
  };

  // Update day if it exceeds the number of days in the selected month
  useEffect(() => {
    const maxDays = getDaysInMonth(month, year);
    if (day > maxDays) {
      setDay(maxDays);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year]);

  // Notify the parent of the updated date
  useEffect(() => {
    const updatedDate = new Date(year, month - 1, day);
    onChange(updatedDate);
  }, [year, month, day, onChange]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Year dropdown */}
      <YearDropdownSelect value={year} onChange={setYear} />

      {/* Month dropdown */}
      <MonthDropdownSelect value={month} onChange={setMonth} />

      {/* Day dropdown */}
      <DayDropdownSelect
        selectedMonth={month}
        selectedYear={year}
        value={day}
        onChange={setDay}
      />
    </div>
  );
}

export default BirthdateForm;
