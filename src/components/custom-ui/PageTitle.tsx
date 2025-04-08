import React, { ReactNode } from "react";

function PageTitle({ children }: { children: ReactNode }) {
  return <div className="text-4xl font-medium">{children}</div>;
}

export default PageTitle;
