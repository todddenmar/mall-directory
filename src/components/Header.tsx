"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ShieldUserIcon } from "lucide-react";
import {
  Protect,
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/firebase";

function Header() {
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
      <Link href={"/"}>Robinsons Mall Pagadian</Link>
      <div className="flex items-center gap-4">
        <SignedOut>
          <Link href={"/sign-in"}>Sign In</Link>
        </SignedOut>
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
