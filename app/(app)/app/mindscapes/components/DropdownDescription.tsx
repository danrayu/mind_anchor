import React from "react";
interface CollapseProps {
  description: string;
}

function DropdownDescription({ description }: CollapseProps) {
  return (
    <div className="collapse bg-base-200 p-0 max-w-2xl z-1">
      <input type="checkbox" className="z-1"/>
      <div className="collapse-title text-xl font-medium z-1">
        Description
      </div>
      <div className="collapse-content z-1">
        <p className="whitespace-pre-line mb-1 leading-[26px]">{description ? description : "No description"}</p>
      </div>
    </div>
  );
}

export default DropdownDescription;
