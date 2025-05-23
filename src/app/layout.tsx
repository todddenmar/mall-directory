import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import DataProvider from "@/components/DataProvider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { SyncActiveOrganization } from "@/components/SyncActiveOrganization";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robinsons Pagadian",
  description: "NextJS app created by Todd Mendiola",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = await auth();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-100 antialiased flex flex-col h-screen relative`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <SyncActiveOrganization membership={sessionClaims?.membership} />
          <Header />
          <DataProvider />
          <div className="flex-1 flex flex-col">{children}</div>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
