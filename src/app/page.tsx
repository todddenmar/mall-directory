import FloorPlanSection from "@/components/sections/FloorPlanSection";
import FloorsList from "@/components/sections/FloorsList";

export default function Home() {
  return (
    <main className="p-4 flex-1 flex flex-col ">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 items-center flex-1 md:max-w-screen-xl mx-auto">
        <div className="lg:col-span-1">
          <FloorsList />
        </div>
        <div className="lg:col-span-2">
          <FloorPlanSection />
        </div>
      </div>
    </main>
  );
}
