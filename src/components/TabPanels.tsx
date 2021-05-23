import { ReactNode } from "react";

const TabPanels = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ marginTop: "20px", padding: " 0 20px" }}>{children}</div>
  );
};

export default TabPanels;
