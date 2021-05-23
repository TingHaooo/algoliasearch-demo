import { ReactNode } from "react";

interface ITabPanelProps {
  children: ReactNode;
  isCur: boolean;
}

const TabPanel = (props: ITabPanelProps) => {
  const { isCur, children } = props;

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: isCur ? "0px" : "-100000000px",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TabPanel;
