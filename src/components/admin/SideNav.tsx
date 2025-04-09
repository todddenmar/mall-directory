"use client";
import { TNavLink } from "@/types";
import { ImagesIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

function SideNav() {
  const pathname = usePathname();
  const adminNav: TNavLink[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboardIcon size={18} />,
    },
    {
      id: "gallery",
      label: "Gallery",
      path: "/admin/gallery",
      icon: <ImagesIcon size={18} />,
    },
  ];
  return (
    <div className="p-4 border rounded-lg flex flex-col gap-2">
      {adminNav.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link href={item.path} key={`side-nav-item-${item.id}`}>
            <Button
              type="button"
              variant={isActive ? "default" : "secondary"}
              className="w-full justify-start"
            >
              {item.icon}
              {item.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}

export default SideNav;
