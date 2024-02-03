import React from "react";
interface CollapseProps {
  description: string;
}

function DropdownDescription({ description }: CollapseProps) {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        Description
      </div>
      <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box max-w">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default DropdownDescription;
