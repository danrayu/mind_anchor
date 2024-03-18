import React from "react";
import "./Alert.css";

interface Props {
  show: boolean;
  children: React.ReactNode;
}

function AlertBody({ show, children }: Props) {
  return (
    <div
      className={
        "absolute z-20 left-1/2 max-h-[100px] -top-[140px] " +
        (show && "alert-walk")
      }
    >
      {children}
    </div>
  );
}

export default AlertBody;
