import React, { ReactNode } from "react";

function SectionTitle({ children }: { children?: ReactNode }) {
  return <h3 className="text-xl">{children}</h3>;
}

export default SectionTitle;
