"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ShieldUserIcon } from "lucide-react";
import { Protect, SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/lib/store";
function Header() {
  const { currentFloors, currentFloorSelected, setCurrentFloorSelected } =
    useAppStore();
  const onChangeFloor = (val: string) => {
    const selected = currentFloors.find((item) => item.id === val);
    if (selected) setCurrentFloorSelected(selected);
  };
  const { getToken, userId } = useAuth();
  const signIntoFirebaseWithClerk = async () => {
    const token = await getToken({ template: "integration_firebase" });
    const userCredentials = await signInWithCustomToken(auth, token || "");
    // The userCredentials.user object can call the methods of
    // the Firebase platform as an authenticated user.
    console.log("User:", userCredentials.user);
  };
  useEffect(() => {
    if (userId) {
      signIntoFirebaseWithClerk();
    } else {
      // setUserData(null);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <nav className="flex items-center gap-4 justify-between p-4 border-b">
      <Link href={"/"}>Robinsons Pagadian</Link>

      <div className="flex items-center gap-4">
        <div className="block md:hidden">
          <Select
            value={currentFloorSelected?.id}
            onValueChange={onChangeFloor}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Floor" />
            </SelectTrigger>
            <SelectContent>
              {currentFloors.map((item) => {
                return (
                  <SelectItem
                    key={`select-item-floor-${item.id}`}
                    value={item.id}
                  >
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <SignedIn>
          <Protect permission="org:admin:access">
            <Link href={"/admin"}>
              <Button type="button" className="cursor-pointer">
                <ShieldUserIcon />
                <span className="hidden sm:block">Admin</span>
              </Button>
            </Link>
          </Protect>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Header;
