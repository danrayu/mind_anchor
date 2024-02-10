import React from "react";
interface CollapseProps {
  description: string;
}

function DropdownDescription({ description }: CollapseProps) {
  return (
    <div className="collapse bg-base-200 p-0 max-w-2xl">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        Description
      </div>
      <div className="collapse-content">
        <p className="whitespace-pre-line mb-1 leading-[26px]">{description ? description : "No description"}</p>
      </div>
    </div>
  );
}

export default DropdownDescription;
