import { ReactNode } from "react";

interface ITabProps {
  handleOnClick: () => void;
  isCur: boolean;
  children: ReactNode;
}

const Tab = (props: ITabProps) => {
  const { handleOnClick, isCur, children } = props;

  return (
    <div>
      <div
        onClick={handleOnClick}
        style={{
          marginLeft: "10px",
          padding: "10px",
          color: isCur ? "black" : "#333",
          backgroundColor: isCur ? "white" : "#666",
          borderRadius: "3px 3px 0px 0px",
          cursor: "pointer",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Tab;
