import { ReactNode } from "react";

const TabList = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#666",
          height: "60px",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default TabList;
