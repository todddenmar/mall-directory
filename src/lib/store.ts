import { TCategory, TFloor, TSettings, TShop } from "@/types";

import { create } from "zustand";

export type TAppStoreStates = {
  currentSettings: TSettings;
  currentFloorSelected: TFloor | null;
  currentFloors: TFloor[];
  currentShops: TShop[];
  currentCategories: TCategory[];
};

export type TAppStoreActions = {
  setCurrentSettings: (currentFloorSelected: TSettings) => void;
  setCurrentFloorSelected: (currentFloorSelected: TFloor | null) => void;
  setCurrentFloors: (currentFloors: TFloor[]) => void;
  setCurrentShops: (currentShops: TShop[]) => void;
  setCurrentCategories: (currentCategories: TCategory[]) => void;
};
export const useAppStore = create<TAppStoreStates & TAppStoreActions>(
  (set) => ({
    currentSettings: {
      galleryImages: [],
    },
    setCurrentSettings: (currentSettings) => set(() => ({ currentSettings })),
    currentFloorSelected: null,
    setCurrentFloorSelected: (currentFloorSelected) =>
      set(() => ({ currentFloorSelected })),
    currentFloors: [],
    setCurrentFloors: (currentFloors) => set(() => ({ currentFloors })),
    currentShops: [],
    setCurrentShops: (currentShops) => set(() => ({ currentShops })),
    currentCategories: [],
    setCurrentCategories: (currentCategories) =>
      set(() => ({ currentCategories })),
  })
);
