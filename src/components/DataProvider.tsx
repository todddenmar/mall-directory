"use client";
import { DB_COLLECTION, floors } from "@/lib/config";
import { useAppStore } from "@/lib/store";
import { dbFetchCollection, dbFetchDocument } from "@/queries/db-get";
import { TSettings, TShop } from "@/types";
import { useEffect } from "react";

function DataProvider() {
  const {
    setCurrentFloors,
    setCurrentFloorSelected,
    setCurrentShops,
    setCurrentSettings,
  } = useAppStore();
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await dbFetchDocument(DB_COLLECTION.ROOT, "settings");
      if (res.data) {
        setCurrentSettings(res.data as TSettings);
      }
    };
    const fetchShops = async () => {
      const res = await dbFetchCollection(DB_COLLECTION.SHOPS);
      if (res.data) {
        setCurrentShops(res.data as TShop[]);
      }
    };

    const fetchFloors = async () => {
      setCurrentFloors(floors);
      setCurrentFloorSelected(floors[0]);
    };
    fetchSettings();
    fetchShops();
    fetchFloors();
  }, []);
  return null;
}

export default DataProvider;
