import FloorPlanSection from "@/components/sections/FloorPlanSection";
import FloorsList from "@/components/sections/FloorsList";

export default function Home() {
  return (
    <main className="p-4 flex-1 flex flex-col">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-4 lg:gap-10 md:items-center flex-1 md:max-w-screen-xl md:mx-auto">
        <div className="md:col-span-1">
          <FloorsList />
        </div>
        <div className="md:col-span-2">
          <FloorPlanSection />
        </div>
      </div>
    </main>
  );
}
