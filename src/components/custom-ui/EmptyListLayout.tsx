import React, { ReactNode } from "react";

function EmptyListLayout({ children }: { children: ReactNode }) {
  return (
    <div className="border border-dashed bg-white/5 rounded-lg text-muted-foreground text-sm flex flex-col items-center justify-center w-full min-h-[100px]">
      {children}
    </div>
  );
}

export default EmptyListLayout;
