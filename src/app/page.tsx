import FloorPlanPublicSection from "@/components/sections/FloorPlanPublicSection";
import FloorsList from "@/components/sections/FloorsList";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col md:p-4">
      <div className="flex flex-col md:grid md:grid-cols-3 lg:gap-10 md:items-center flex-1 md:max-w-screen-xl md:mx-auto">
        <div className="md:col-span-1 p-4">
          <FloorsList />
        </div>
        <div className="md:col-span-2 flex-1 flex flex-col">
          <FloorPlanPublicSection />
        </div>
      </div>
    </main>
  );
}
