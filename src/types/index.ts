import { ReactNode } from "react";

export type TNavLink = {
  id: string;
  path: string;
  label: string;
  icon?: ReactNode;
};

export type TRoleType = "MANAGER" | "RECEPTIONIST" | "ADMIN";
export type TGender = "MALE" | "FEMALE";

export type TPeriod = "AM" | "PM";

export type TTime = {
  hour: string;
  minute: string;
  period: TPeriod;
};

export type TFloor = {
  id: string;
  name: string;
  description: string;
  imageURL: string;
};
export type TSettings = {
  galleryImages?: TMediaFile[];
};
export type TCoordinates = { x: number; y: number };

export type TCategory = {
  id: string;
  name: string;
  description?: string;
  tags?: string;
};
export type TShop = {
  id: string;
  slug: string;
  categoryID?: string;
  floorID: string;
  coordinates: TCoordinates;
  name: string;
  description?: string;
  imageURL?: string;
  tags?: string;
  isSoonToOpen?: boolean;
  opensAt: TTime;
  closesAt: TTime;
  mobileNumber?: string;
};

export type TShopCategory = {
  id: string;
  name: string;
  description?: string;
  tags?: string;
  icon?: ReactNode;
};

export type TProduct = {
  id: string;
  name: string;
  categoryID: string | null;
  description?: string;
  price: number;
  compareAtPrice?: number;
  imageURL?: string;
  createdAt: string;
  isAvailable: boolean;
};
export type TFilePreview = File & { preview: string };
export type TMediaFile = {
  id: string;
  url: string;
  name: string;
  type: string;
};
