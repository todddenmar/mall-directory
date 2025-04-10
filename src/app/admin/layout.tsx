import SideNav from "@/components/admin/SideNav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row flex-1 gap-4 p-4">
      <SideNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
