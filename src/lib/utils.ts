import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertCurrency = (value: number) => {
  const formatted = new Intl.NumberFormat("fil-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
  return formatted;
};

export const calculateAge = (dateString: string): number => {
  const birthdate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
};

export const customDateFormat = (date: Date, withTime?: boolean) => {
  return withTime
    ? format(date, "MMMM d, yyyy p")
    : format(date, "MMMM d, yyyy");
};
export const customTimeFormat = (date: Date) => {
  return format(date, "p");
};

export const getYearAndMonthString = (dateToday: Date) => {
  const year = dateToday.getFullYear();
  const month = format(dateToday, "MMMM");
  return { year: String(year), month };
};

export const pluralize = ({
  number,
  plural,
  singular,
}: {
  number: number;
  plural: string;
  singular: string;
}) => {
  if (number > 1) {
    return `${number} ${plural}`;
  } else {
    return `${number} ${singular}`;
  }
};
