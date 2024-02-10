import React from "react";
interface DescriptionFieldProps {
  value: string;
  onChange: (event: any) => void;
}

function DescriptionField({ value, onChange }: DescriptionFieldProps) {
  return (
    <div className="mb-4 w-full">
      <div className="label">
        <span className="label-text text-base">Description</span>
      </div>
      <textarea
        className="textarea textarea-bordered w-full h-[150px] text-base pre-line"
        placeholder="Enter the description of the mindscape"
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}

export default DescriptionField;
