import { ReactNode } from "react";

interface IButtonProps {
  handleButtonClick: () => void;
  isActive: boolean;
  children: ReactNode;
}

const Button = (props: IButtonProps) => {
  const { handleButtonClick, isActive, children } = props;

  return (
    <div
      onClick={handleButtonClick}
      style={{
        backgroundColor: isActive ? "white" : "#999",
        color: isActive ? "black" : "white",
        border: isActive ? "1px solid black" : undefined,
        padding: isActive ? "5px" : "3px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};

export default Button;
