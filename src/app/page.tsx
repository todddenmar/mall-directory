import ShopCategoriesSection from "@/components/sections/ShopCategoriesSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col ">
      <div className="relative w-full aspect-video lg:aspect-auto lg:h-[800px]">
        <Image
          className="object-cover object-bottom"
          fill
          sizes="100%"
          priority
          src={"/images/banner.jpg"}
          alt="robinsons pagadian air view"
          style={{
            overflowClipMargin: "unset",
          }}
        />
      </div>
      <div className="flex">
        <div className="w-full max-w-sm">
          <ShopCategoriesSection />
        </div>
      </div>
    </main>
  );
}
