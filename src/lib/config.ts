import { TFloor } from "@/types";

export const OPTIONS_HOUR = Array.from({ length: 12 }, (_, index) => {
  const hour = index + 1; // Generates numbers from 1 to 12
  return {
    value: hour.toString(),
    label: `${hour}`,
  };
});

export const OPTIONS_MINUTE = Array.from({ length: 12 }, (_, index) => {
  const minute = index * 5; // Generates 0, 5, 10, ..., 55
  return {
    value: minute.toString().padStart(2, "0"), // Ensures two-digit format
    label: minute.toString().padStart(2, "0"),
  };
});

export const OPTIONS_DAYS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export const DB_METHOD_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

export const DB_COLLECTION = {
  SHOPS: "shops",
  CATEGORIES: "categories",
  ROOT: "root",
};

export const PH_PROVINCES: string[] = [
  "Abra",
  "Agusan del Norte",
  "Agusan del Sur",
  "Aklan",
  "Albay",
  "Antique",
  "Apayao",
  "Aurora",
  "Basilan",
  "Bataan",
  "Batanes",
  "Batangas",
  "Benguet",
  "Biliran",
  "Bohol",
  "Bukidnon",
  "Bulacan",
  "Cagayan",
  "Camarines Norte",
  "Camarines Sur",
  "Camiguin",
  "Capiz",
  "Catanduanes",
  "Cavite",
  "Cebu",
  "Cotabato",
  "Davao de Oro",
  "Davao del Norte",
  "Davao del Sur",
  "Davao Occidental",
  "Davao Oriental",
  "Dinagat Islands",
  "Eastern Samar",
  "Guimaras",
  "Ifugao",
  "Ilocos Norte",
  "Ilocos Sur",
  "Iloilo",
  "Isabela",
  "Kalinga",
  "La Union",
  "Laguna",
  "Lanao del Norte",
  "Lanao del Sur",
  "Leyte",
  "Maguindanao del Norte",
  "Maguindanao del Sur",
  "Marinduque",
  "Masbate",
  "Misamis Occidental",
  "Misamis Oriental",
  "Mountain Province",
  "Negros Occidental",
  "Negros Oriental",
  "Northern Samar",
  "Nueva Ecija",
  "Nueva Vizcaya",
  "Occidental Mindoro",
  "Oriental Mindoro",
  "Palawan",
  "Pampanga",
  "Pangasinan",
  "Quezon",
  "Quirino",
  "Rizal",
  "Romblon",
  "Samar",
  "Sarangani",
  "Siquijor",
  "Sorsogon",
  "South Cotabato",
  "Southern Leyte",
  "Sultan Kudarat",
  "Sulu",
  "Surigao del Norte",
  "Surigao del Sur",
  "Tarlac",
  "Tawi-Tawi",
  "Zambales",
  "Zamboanga del Norte",
  "Zamboanga del Sur",
  "Zamboanga Sibugay",
];
export const floors: TFloor[] = [
  {
    id: "lower-ground-floor",
    name: "Lower Ground",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    imageURL: "/images/Lower-Ground-Floor.png",
  },
  {
    id: "upper-ground-floor",
    name: "Upper Ground",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    imageURL: "/images/Upper-Ground-Floor.png",
  },
  {
    id: "second-floor",
    name: "Level 2",
    description:
      "Lorem Ipsum iss simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    imageURL: "/images/Second-Floor.png",
  },
  {
    id: "third-floor",
    name: "Level 3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    imageURL: "/images/Third-Floor.png",
  },
];
